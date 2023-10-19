# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_19_103138) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "workouts", force: :cascade do |t|
    t.date "date", null: false
    t.string "target", null: false
    t.text "exercises", null: false
    t.text "comments", null: false
    t.string "image", default: "https://cdn.pixabay.com/photo/2016/03/27/23/00/weight-lifting-1284616_1280.jpg"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
