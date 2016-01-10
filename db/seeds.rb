# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'json'

College.destroy_all
Event.destroy_all
Event_Location.destroy_all
Comment.destroy_all
User.destroy_all
Attendance.destroy_all
Tag.destroy_all

json_file = File.read('college.json')

colleges_array = []
colleges = JSON.parse(json_file)
puts colleges.length
puts colleges_array.length
take_out_colleges = ["Community", "Beauty", "Cosmetology", "Phoenix", "ITT Technical", "Therapy", "Skin",
  "Aveda", "Healing", "Paul Mitchell", "Hair", "Hairstyling", "Health", "Culinary", "Dental", "Aveda", "Massage",
  "Medical", "Make-up"]

  colleges.each do |college|
    colleges_array << college
  end

  colleges_array.each_with_index do |college, index|
    college_type = college["Name"]
    take_out_colleges.each do |type|
      if college_type.include?(type)
        colleges_array.delete_at(index)
      end
      College.create!(
      name: college["Name"],
      address: college["Address"],
      city: college["City"],
      zipcode: college["Zip"]
      lat: college["Lat"],
      long: college["Long"]
      )
    end
  end

  all_users = []
  events_array = []

  20.times do |user|
    user = User.create!(
    first_name: Faker::Name.first_name
    last_name: Faker::Name.last_name
    email: Faker::Internet.email(first_name + "." + last_name)
    )
    all_users << user
  end

  # 20.times do |event|
  #   event = Event.create!(
  #
  #   )
  # end

  5.times do |tag|
    tag = Tag.create!(
    title: Faker::Name.title
    )
    events_array.each do |event|
      tag.event = event
      tag.save
    end
  end
