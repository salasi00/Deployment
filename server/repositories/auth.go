package repositories

import (
	"housy/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user models.User) (models.User, error)
	Login(username string) (models.User, error)
	GetUserAuth(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Register(user models.User) (models.User, error) {
	err := r.db.Preload("Role").Create(&user).Error

	return user, err
}

func (r *repository) Login(username string) (models.User, error) {
	var user models.User
	err := r.db.Preload("Role").First(&user, "username=?", username).Error

	return user, err
}

func (r *repository) GetUserAuth(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("Role").First(&user, ID).Error

	return user, err
}
