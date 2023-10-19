package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/harshau007/go-api/controller"
	"github.com/harshau007/go-api/jwt"
)

func Welcome(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("welcome"))
}

func Router() *chi.Mux {
	router := chi.NewRouter()
	router.Use(middleware.Logger, cors.AllowAll().Handler)
	router.MethodFunc("GET", "/jwt", jwt.GetJWT)
	router.Method("get", "/jobs", jwt.ValidateJWT(controller.GetAllUser))
	router.Method("POST", "/user", jwt.ValidateJWT(controller.CreateUser))
	router.Method("PUT", "/user/{id}", jwt.ValidateJWT(controller.UpdateUser))
	router.Method("DELETE","/deleteuser/{id}", jwt.ValidateJWT(controller.DeleteUser))
	router.Method("DELETE","/deletealluser", jwt.ValidateJWT(controller.DeleteAllUser))

	return router
}