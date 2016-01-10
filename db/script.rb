#!/usr/local/bin/ruby
require 'json'

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
    end
  end
