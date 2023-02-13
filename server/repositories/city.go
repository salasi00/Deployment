package repositories

import (
	"housy/models"

	"gorm.io/gorm"
)

type CityRepository interface {
	FindCities() ([]models.City, error)
	GetCity(ID int) (models.City, error)
	CreateCity(city models.City) (models.City, error)
	UpdateCity(city models.City) (models.City, error)
	DeleteCity(city models.City) (models.City, error)
}

func RepositoryCity(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCities() ([]models.City, error) {
	var cities []models.City
	err := r.db.Find(&cities).Error

	return cities, err
}

func (r *repository) GetCity(ID int) (models.City, error) {
	var city models.City
	err := r.db.First(&city, ID).Error

	return city, err
}

func (r *repository) CreateCity(city models.City) (models.City, error) {
	err := r.db.Create(&city).Error

	return city, err
}

func (r *repository) UpdateCity(city models.City) (models.City, error) {
	err := r.db.Save(&city).Error

	return city, err
}

func (r *repository) DeleteCity(city models.City) (models.City, error) {
	err := r.db.Delete(&city).Error

	return city, err
}
