FactoryGirl.define do
  factory :activity do
    name { "#{ Faker::Hacker.verb } the #{ Faker::Hacker.noun }" }
    description ""
  end
end
