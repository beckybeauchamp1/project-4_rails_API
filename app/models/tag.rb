class Tag < ActiveRecord::Base
  has_many :tagged_events, dependent: :destroy
  has_many :events, through: :tagged_events
end
