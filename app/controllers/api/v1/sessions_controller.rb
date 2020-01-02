class Api::V1::SessionsController < ApplicationController
  def create
    # 1. find user
    user = User.find_by(email: params[:email].downcase)
    # 2. check password
    if user && user.authenticate(params[:password])
      cookies.signed[:user_id] = user.id
    else
      render json: { error: "Invalid credentials" }, status: 401
    end

  end

  def destroy
     cookies.delete :user_id
  end
end
