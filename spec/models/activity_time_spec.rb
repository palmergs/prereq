require 'rails_helper'

RSpec.describe Activity, as: :model do

  it 'has a datetime field that is null by default' do
    a = build(:activity)
    expect(a.activity_at).to be_nil
    a.activity_at = DateTime.now
    expect(a.activity_at).to_not be_nil
  end

  it 'has a duration field that can be converted into standard quantities' do
    a = build(:activity)
    expect(a.duration_secs).to be_nil
    a.duration_secs = 24 * 60 * 60
    expect(a.days).to eq(1)
    expect(a.hours).to eq(24)
    expect(a.minutes).to eq(24 * 60)
    expect(a.seconds).to eq(24 * 60 * 60)
  end

  it 'can pin the time to the beginning or end of the period' do
    dt = DateTime.new(2016, 03, 03, 0, 0, 0)
    a = build(:activity, activity_at: dt, duration_secs: 24 * 60 * 60)
    a.pin = Activity::PIN_START
    expect(a.start_at).to eq(a.activity_at)
    expect(a.end_at).to eq(DateTime.new(2016, 03, 04, 0, 0, 0))

    a.pin = Activity::PIN_END
    expect(a.end_at).to eq(a.activity_at)
    expect(a.start_at).to eq(DateTime.new(2016, 03, 02, 0, 0, 0))
  end
end
