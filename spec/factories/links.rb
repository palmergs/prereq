FactoryGirl.define do
  factory :link do
    previous_activity factory: :activity
    next_activity factory: :activity
  end
end
