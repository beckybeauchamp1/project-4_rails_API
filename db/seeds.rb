# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'json'

Event.destroy_all
Comment.destroy_all
User.destroy_all
Attendance.destroy_all
Tag.destroy_all

# json_file = File.read('db/college.json')
#
# colleges_array = []
# colleges = JSON.parse(json_file)
# take_out_colleges = ["Community", "Beauty", "Cosmetology", "Phoenix", "ITT Technical", "Therapy", "Skin",
#   "Aveda", "Healing", "Paul Mitchell", "Hair", "Hairstyling", "Health", "Culinary", "Dental", "Aveda", "Massage",
#   "Medical", "Make-up"]
#
#   colleges.each do |college|
#     colleges_array << college
#   end
#
#   colleges_array.each_with_index do |college, index|
#     college_type = college["Name"]
#     take_out_colleges.each do |type|
#       if college_type.include?(type)
#         colleges_array.delete_at(index)
#       end
#     end
#     College.create!(
#     name: college["Name"],
#     address: college["Address"],
#     city: college["City"],
#     zipcode: college["Zip"],
#     lat: college["Lat"],
#     long: college["Long"]
#     )
#   end

  events_array = []

  20.times do |event|
    event = Event.create!(
    title: Faker::Name.title,
    image: Faker::Placeholdit.image,
    content: Faker::Hipster.paragraph,
    start_date: Faker::Date.forward(1),
    end_date: Faker::Date.forward(1),
    starting_time: Faker::Time.forward(1, :morning),
    ending_time: Faker::Time.forward(1, :evening),
    cost: Faker::Commerce.price
    )
    events_array << event
  end

  # colleges_array.each do |college|
  #   events_array.each do |event|
  #     event.college = college
  #     event.save!
  #   end
  # end

  5.times do |tag|
    tag = Tag.create!(
    title: Faker::Name.title
    )
  end
