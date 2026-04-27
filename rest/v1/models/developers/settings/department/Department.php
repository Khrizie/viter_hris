<?php

class Department
{
    public $department_aid;
    public $department_is_active;
    public $department_name;
    public $department_created;
    public $department_updated;

    public $connection;
    public $start;
    public $total;
    public $search;
    public $lastInsertedId;

    public $tblSettingsDepartment;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsDepartment = "settings_department";
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblSettingsDepartment} (
                        department_is_active,
                        department_name,
                        department_created,
                        department_updated
                    ) VALUES (
                        :department_is_active,
                        :department_name,
                        :department_created,
                        :department_updated
                    )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
                "department_name" => $this->department_name,
                "department_created" => $this->department_created,
                "department_updated" => $this->department_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "SELECT * FROM {$this->tblSettingsDepartment} WHERE 1=1 ";

            // FILTER
            $sql .= $this->department_is_active !== '' 
                ? "AND department_is_active = :department_is_active " 
                : "";

            // SEARCH
            if ($this->search !== '') {
                $sql .= "AND department_name LIKE :department_name ";
            }

            $query = $this->connection->prepare($sql);

            $params = array_merge(
                $this->department_is_active !== '' 
                    ? ["department_is_active" => $this->department_is_active] 
                    : [],
                $this->search !== '' 
                    ? ["department_name" => "%{$this->search}%"] 
                    : []
            );

            $query->execute($params);

        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "SELECT * FROM {$this->tblSettingsDepartment} WHERE 1=1 ";

            // FILTER
            $sql .= $this->department_is_active !== '' 
                ? "AND department_is_active = :department_is_active " 
                : "";

            // SEARCH
            if ($this->search !== '') {
                $sql .= "AND department_name LIKE :department_name ";
            }

            // PAGINATION
            $sql .= "LIMIT :start, :total";

            $query = $this->connection->prepare($sql);

            $params = array_merge(
                $this->department_is_active !== '' 
                    ? ["department_is_active" => $this->department_is_active] 
                    : [],
                $this->search !== '' 
                    ? ["department_name" => "%{$this->search}%"] 
                    : [],
                [
                    "start" => $this->start - 1,
                    "total" => $this->total,
                ]
            );

            $query->execute($params);

        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function update()
    {
        try {
            $sql = "UPDATE {$this->tblSettingsDepartment} SET
                        department_name = :department_name,
                        department_updated = :department_updated
                    WHERE department_aid = :department_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => $this->department_name,
                "department_updated" => $this->department_updated,
                "department_aid" => $this->department_aid,
            ]);

        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function active()
    {
        try {
            $sql = "UPDATE {$this->tblSettingsDepartment} SET
                        department_is_active = :department_is_active,
                        department_updated = :department_updated
                    WHERE department_aid = :department_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
                "department_updated" => $this->department_updated,
                "department_aid" => $this->department_aid,
            ]);

        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function delete()
    {
        try {
            $sql = "DELETE FROM {$this->tblSettingsDepartment}
                    WHERE department_aid = :department_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_aid" => $this->department_aid,
            ]);

        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "SELECT department_name 
                    FROM {$this->tblSettingsDepartment}
                    WHERE department_name = :department_name";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => $this->department_name,
            ]);

        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }
}