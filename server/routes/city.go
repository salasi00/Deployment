package routes

import (
	"housy/handlers"
	"housy/pkg/mysql"
	"housy/repositories"

	"github.com/gorilla/mux"
)

func CityRoutes(r *mux.Router) {
	cityRepository := repositories.RepositoryCity(mysql.DB)
	h := handlers.HandlerCity(cityRepository)

	r.HandleFunc("/cities", h.FindCities).Methods("GET")
	r.HandleFunc("/city/{id}", h.GetCity).Methods("GET")
	r.HandleFunc("/city", h.CreateCity).Methods("POST")
	r.HandleFunc("/city/{id}", h.UpdateCity).Methods("PATCH")
	r.HandleFunc("/city/{id}", h.DeleteCity).Methods("DELETE")
}
