# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

9.times do
  Workout.create(
    date: Time.now.to_date,
    target: 'Legs',
    exercises: 'Squats: 100 kg 4x12, Romanian deadlifts: 80 kg 4x12, Hip thrusts: 120 kg 4x12.',
    comments: 'Light weight!'
  )
end
