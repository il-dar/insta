class CommentsController < ApplicationController
  before_action :define_post
  skip_before_action :verify_authenticity_token
  respond_to :json

  def show
    @comments = @post.comments
  end

  def index
    @comments = @post.comments
  end

  def new

  end

  def create

    @comment = @post.comments.build(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      respond_to do |format|
       format.html {head :ok}
       format.json {render json: @comment.to_json}
       format.js {head :ok}
      end
    else
       flash[:alert] = "Comment could not be saved"
       redirect_to root_path
    end

  end

  def edit

  end

  def destroy
    @comment = @post.comments.find(params[:id])

    if @comment.user_id == current_user.id
      @comment.delete
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json {render json: @comment.to_json}
        format.js
      end
    else
      flash[:alert] = "Comment could not be deleted"
      format.json { render json: @comment.errors }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def define_post

    @post = Post.find(params[:post_id])

  end

end
