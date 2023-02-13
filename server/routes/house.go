package routes

import (
	"housy/handlers"
	"housy/pkg/middleware"
	"housy/pkg/mysql"
	"housy/repositories"

	"github.com/gorilla/mux"
)

func HouseRoutes(r *mux.Router) {
	houseRepository := repositories.RepositoryHouse(mysql.DB)
	h := handlers.HandlerHouse(houseRepository)

	r.HandleFunc("/houses", h.FindHouse).Methods("GET")
	r.HandleFunc("/house/{id}", h.GetHouse).Methods("GET")
	// r.HandleFunc("/house", h.CreateHouse).Methods("POST")
	r.HandleFunc("/house", middleware.UploadFile(h.CreateHouse)).Methods("POST")
	r.HandleFunc("/house/{id}", h.UpdateHouse).Methods("PATCH")
	r.HandleFunc("/house/{id}", h.DeleteHouse).Methods("DELETE")
	// r.HandleFunc("/house", middlewre.Autha(h.CreateHouse)).Methods("POST")
}
