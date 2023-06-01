package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

const (
	dbHost     = "db"
	dbPort     = 5432
	dbUser     = "postgres"
	dbPassword = "postgres"
	dbName     = "postgres"
)

func main() {
	postgresInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName,
	)
	db, err := sql.Open("postgres", postgresInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	server := NewServer(db)

	http.HandleFunc("/add", server.handleAddTodo)
	http.HandleFunc("/check", server.handleCheckTodo)
	http.HandleFunc("/uncheck", server.handleUncheckTodo)
	http.HandleFunc("/delete", server.handleDeleteCheckedTodos)
	http.HandleFunc("/get", server.handleGetTodos)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
