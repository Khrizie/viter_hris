<?php

class Notification
{
    public $notification_aid;
    public $notification_is_active;
    public $notification_first_name;
    public $notification_email;
    public $notification_purpose;
    public $notification_last_name;
    public $notification_created;
    public $notification_updated;
    public $connection;
    public $start;
    public $total;
    public $search;
    public $lastInsertedId;
    public $tblSettingsNotification;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsNotification = "settings_notification";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsNotification}";
            $sql .= " ( ";
            $sql .= " notification_is_active, ";
            $sql .= " notification_first_name, ";
            $sql .= " notification_last_name, ";
            $sql .= " notification_email, ";
            $sql .= " notification_purpose, ";
            $sql .= " notification_created, ";
            $sql .= " notification_updated ";
            $sql .= ") values (";
            $sql .= " :notification_is_active, ";
            $sql .= " :notification_first_name, ";
            $sql .= " :notification_last_name, ";
            $sql .= " :notification_email, ";
            $sql .= " :notification_purpose, ";
            $sql .= " :notification_created, ";
            $sql .= " :notification_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_first_name" => $this->notification_first_name,
                "notification_last_name" => $this->notification_last_name,
                "notification_email" => $this->notification_email,
                "notification_purpose" => $this->notification_purpose,
                "notification_created" => $this->notification_created,
                "notification_updated" => $this->notification_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
 public function update()
    {
        try {
            $sql = " update {$this->tblSettingsNotification} set ";
            $sql .= " notification_first_name = :notification_first_name, ";
            $sql .= " notification_last_name = :notification_last_name, ";
            $sql .= " notification_email = :notification_email, ";
            $sql .= " notification_purpose = :notification_purpose ";
            $sql .= " notification_updated = :notification_updated ";
            $sql .= " where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_first_name" => $this->notification_first_name,
                "notification_last_name" => $this->notification_last_name,
                "notification_email" => $this->notification_email,
                "notification_purpose" => $this->notification_purpose,
                "notification_updated" => $this->notification_updated,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $e) {
            // returnError($e); turn on when debugging
            $query = false;
        }
        return $query;
    }

   public function active()
    {
        try {
            $sql = "update {$this->tblSettingsNotification} set ";
            $sql .= "notification_is_active = :notification_is_active, ";
            $sql .= "notification_updated = :notification_updated ";
            $sql .= "where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_updated" => $this->notification_updated,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $e) {
            // returnError($e); // use this error if invalid request error
            $query = false;
        }
        return $query;
    }

   public function delete()
    {
        try {
            $sql = "delete from {$this->tblSettingsNotification} ";
            $sql .= "where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $e) {
            // returnError($e); // use this error if invalid request error
            $query = false;
        }
        return $query;
    }
    public function checkName()
    {
        try {
            $sql = "SELECT notification_aid
                    FROM {$this->tblSettingsNotification}
                    WHERE notification_first_name = :notification_first_name
                    AND notification_last_name = :notification_last_name";

            $query = $this->connection->prepare($sql);

            $query->execute([
                "notification_first_name" => $this->notification_first_name,
                "notification_last_name" => $this->notification_last_name,
            ]);

            return $query;

        } catch (PDOException $e) {
            return false;
        }
    }

    public function checkEmail()
    {
        try {
            $sql = "SELECT notification_aid
                    FROM {$this->tblSettingsNotification}
                    WHERE notification_email = :notification_email";

            $query = $this->connection->prepare($sql);

            $query->execute([
                "notification_email" => $this->notification_email,
            ]);

            return $query;

        } catch (PDOException $e) {
            return false;
        }
    }
    public function readAll(){
        try{
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsNotification} ";
            $sql .= " where true ";
            $sql .= $this->notification_is_active 
                ? " and notification_is_active = :notification_is_active " 
                : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? " notification_first_name like :notification_first_name " : " ";
            $sql .= $this->search != "" ? " or notification_last_name like :notification_last_name " : " ";
            $sql .= $this->search != "" ? " or notification_email like :notification_email " : " ";
            $sql .= $this->search != "" ? " ) " : " ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                ...$this->notification_is_active ? ["notification_is_active" => $this->notification_is_active] : [],
                ...$this->search ? [
                    "notification_first_name" => "%{$this->search}%",
                    "notification_last_name" => "%{$this->search}%",
                    "notification_email" => "%{$this->search}%",
                    ] : [],
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }
    
    public function readLimit(){
        try{
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsNotification} ";
            $sql .= " where true ";
            $sql .= $this->notification_is_active != ""
                ? " and notification_is_active = :notification_is_active " 
                : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? " notification_first_name like :notification_first_name " : " ";
            $sql .= $this->search != "" ? " or notification_last_name like :notification_last_name " : " ";
            $sql .= $this->search != "" ? " or notification_email like :notification_email " : " ";
            $sql .= $this->search != "" ? " ) " : " ";
            $sql .= " limit :start, ";
            $sql .= " :total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->start - 1,
                "total" => $this->total,
                ...$this->notification_is_active != "" ? ["notification_is_active" => $this->notification_is_active] : [],
                ...$this->search != "" ? [
                    "notification_first_name" => "%{$this->search}%",
                    "notification_last_name" => "%{$this->search}%",
                    "notification_email" => "%{$this->search}%",
                    ] : [],
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

}