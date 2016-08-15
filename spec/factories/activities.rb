FactoryGirl.define do
  factory :activity do
    name { "#{ Faker::Hacker.verb } the #{ Faker::Hacker.noun }" }
    description ""
    activity_at nil
    pin Activity::PIN_UNDEFINED
    duration_secs nil
  end
end
