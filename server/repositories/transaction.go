package repositories

import (
	"housy/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransaction() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	UpdateTransactionNew(status string, ID string) error
	FindTransactionByID(userId int) ([]models.Transaction, error)
	// FindTransactionOwner(userId int) ([]models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("House.City").Preload("House.User").Preload("User.Role").Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("House.City").Preload("User.Role").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("House.City").Preload("User.Role").Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("House.City").Preload("User.Role").First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) UpdateTransactionNew(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("House").Preload("User").First(&transaction, ID)

	// If is different & Status is "success" decrement product quantity

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return err
}

func (r *repository) FindTransactionByID(userId int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Where("user_id=?", userId).Preload("House.City").Preload("House.User").Preload("User.Role").Find(&transaction).Error

	return transaction, err
}

// func (r *repository) FindTransactionOwner(UserID int) ([]models.Transaction, error) {
// 	var transaction []models.Transaction
// 	err := r.db.Preload("House.City").Preload("House.User").Find(&transaction).Error

// 	return transaction, err
// }
