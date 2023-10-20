# frozen_string_literal: true

class CreateWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :workouts do |t|
      t.date :date, null: false
      t.string :target, null: false
      t.text :exercises, null: false
      t.text :comments, null: false
      t.string :image, default: 'https://cdn.pixabay.com/photo/2016/03/27/23/00/weight-lifting-1284616_1280.jpg'

      t.timestamps
    end
  end
end
