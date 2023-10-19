# frozen_string_literal: true

class Workout < ApplicationRecord
  validates :date, presence: true
  validates :target, presence: true
  validates :exercises, presence: true
  validates :comments, presence: true
end
