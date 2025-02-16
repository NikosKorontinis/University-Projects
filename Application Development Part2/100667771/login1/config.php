<?php

class Connect extends PDO
{
    public function __construct()
    {
        try {
            parent::__construct("mysql:host=localhost;dbname=api", 'root', '');
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}


?>

