package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	housedto "housy/dto/house"
	dto "housy/dto/result"
	"housy/models"
	"housy/repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"gorm.io/datatypes"
)

type handlerhouse struct {
	HouseRepository repositories.HouseRepository
}

func HandlerHouse(HouseRepository repositories.HouseRepository) *handlerhouse {
	return &handlerhouse{HouseRepository}
}

func (h *handlerhouse) FindHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	house, err := h.HouseRepository.FindHouse()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: house}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerhouse) GetHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	house, err := h.HouseRepository.GetHouse(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: house}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerhouse) CreateHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	cityid, _ := strconv.Atoi(r.FormValue("cityid"))
	userid, _ := strconv.Atoi(r.FormValue("userid"))
	request := housedto.CreateHouseRequest{
		Name:        r.FormValue("name"),
		Amenities:   datatypes.JSON(r.FormValue("amenities")),
		Price:       r.FormValue("price"),
		Rent:        r.FormValue("rent"),
		Bedroom:     r.FormValue("bedroom"),
		Bathroom:    r.FormValue("bathroom"),
		Sqf:         r.FormValue("sqf"),
		Description: r.FormValue("description"),
		Address:     r.FormValue("address"),
		CityID:      cityid,
		UserID:      userid,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	resp, errUpload := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "Housy"})
	if errUpload != nil {
		fmt.Println(errUpload.Error())
	}

	house := models.House{
		CityID:      request.CityID,
		City:        request.City,
		UserID:      request.UserID,
		User:        request.User,
		Name:        request.Name,
		Amenities:   datatypes.JSON(request.Amenities),
		Price:       request.Price,
		Rent:        request.Rent,
		Bedroom:     request.Bedroom,
		Bathroom:    request.Bathroom,
		Sqf:         request.Sqf,
		Description: request.Description,
		Address:     request.Address,
		Image:       resp.SecureURL,
	}

	data, err := h.HouseRepository.CreateHouse(house)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, _ = h.HouseRepository.GetHouse(data.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerhouse) UpdateHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(housedto.UpdateHouseRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	house, err := h.HouseRepository.GetHouse(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Name != "" {
		house.Name = request.Name
	}

	if request.Amenities != nil {
		house.Amenities = request.Amenities
	}

	if request.Price != "" {
		house.Price = request.Price
	}

	if request.Rent != "" {
		house.Rent = request.Rent
	}

	if request.Bedroom != "" {
		house.Bedroom = request.Bedroom
	}

	if request.Bathroom != "" {
		house.Bathroom = request.Bathroom
	}

	if request.Sqf != "" {
		house.Sqf = request.Sqf
	}

	if request.Description != "" {
		house.Description = request.Description
	}

	if request.Address != "" {
		house.Address = request.Address
	}

	data, err := h.HouseRepository.UpdateHouse(house)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerhouse) DeleteHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	house, err := h.HouseRepository.GetHouse(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.HouseRepository.DeleteHouse(house)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func convertHouseResponse(u models.House) housedto.HouseResponse {
	return housedto.HouseResponse{
		ID:        u.ID,
		CityID:    u.CityID,
		City:      u.City,
		UserID:    u.UserID,
		User:      u.User,
		Name:      u.Name,
		Price:     u.Price,
		Rent:      u.Rent,
		Amenities: u.Amenities,
		Bedroom:   u.Bedroom,
		Bathroom:  u.Bathroom,
	}
}
