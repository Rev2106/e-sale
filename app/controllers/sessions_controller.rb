class SessionsController < ApplicationController
  def new
    redirect_to root_path if current_user
  end

  def create
    # 1. find user
    user = User.find_by(email: params[:email].downcase)
    # 2. check password
    if user && user.authenticate(params[:password])
      cookies.signed[:user_id] = user.id
      flash[:notice] = "Sign in successful"
      redirect_to root_path
    else
      flash.now[:alert] = "Invalid user credentials"
      render :new
    end

  end

  def destroy
     cookies.delete :user_id
     flash[:notice] = "You have been signed out"
     redirect_to root_path
  end
end
