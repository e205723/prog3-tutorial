package main

import (
	"database/sql"
)

type Server struct {
	Db *sql.DB
}

type Todo struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	IsDone bool   `json:"isDone"`
}

func NewServer(db *sql.DB) *Server {
	return &Server{Db: db}
}
