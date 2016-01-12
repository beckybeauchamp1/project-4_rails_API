class College < ActiveRecord::Base
  has_many :events, dependent: :destroy
  has_many :users
end
