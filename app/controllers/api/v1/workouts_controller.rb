# frozen_string_literal: true

module Api
  module V1
    class WorkoutsController < ApplicationController
      before_action :set_workout, only: %i[show destroy]

      def index
        workout = Workout.all.order(date: :desc, created_at: :desc)
        render json: workout
      end

      def create
        workout = Workout.create!(workout_params)
        if workout
          render json: workout
        else
          render json: workout.errors
        end
      end

      def show
        render json: @workout
      end

      def destroy
        @workout&.destroy
        render json: { message: 'Workout deleted!' }
      end

      private

      def workout_params
        params.permit(:date, :target, :exercises, :comments, :image)
      end

      def set_workout
        @workout = Workout.find(params[:id])
      end
    end
  end
end
