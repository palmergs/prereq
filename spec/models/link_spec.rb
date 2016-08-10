require 'rails_helper'

RSpec.describe Link, type: :model do
  it 'can be instantiated' do
    expect(Link.new).to_not be_nil
  end

  it 'can be persisted' do
    expect(create(:link)).to be_persisted
    expect(create(:link)).to be_persisted
  end

  it 'a new links activities are empty' do
    link = Link.new
    expect(link.previous_activities).to be_empty
    expect(link.next_activities).to be_empty
  end

  it 'has enables through relationships to activites' do
    link = create(:link)
    pre = link.previous_activity
    post = link.next_activity
    expect(pre.next_links).to include(link)
    expect(pre.next_activities).to include(post)
    expect(post.previous_links).to include(link)
    expect(post.previous_activities).to include(pre)
  end

  describe "getting all associations" do


    it 'activites have correct relationship' do
      link = create(:link)
      expect(link.previous_activity.next_activities).to include(link.next_activity)
      expect(link.next_activity.previous_activities).to include(link.previous_activity)
    end

    it 'includes own activities in full search' do
      link = create(:link)
      expect(link.next_activities.count).to eq(1)
      expect(link.next_activities).to include(link.next_activity)
      expect(link.previous_activities.count).to eq(1)
      expect(link.previous_activities).to include(link.previous_activity)
    end

    it "can get previous activities" do
      a1 = create(:activity)
      a2 = create(:activity)
      a3 = create(:activity)

      first = create(:link, next_activity: a1)
      create(:link, previous_activity: a1, next_activity: a2)
      create(:link, previous_activity: a2, next_activity: a3)
      last = create(:link, previous_activity: a3)

      expect(first).to be_persisted
      first.reload and last.reload

      expect(first.previous_activities).to include(first.previous_activity)
      expect(first.next_activities).to include(a1)
      expect(first.next_activities).to include(a2)
      expect(first.next_activities).to include(a3)
      expect(first.next_activities).to include(last.next_activity)

      expect(last.next_activities).to include(last.next_activity)
      expect(last.previous_activities).to include(a1)
      expect(last.previous_activities).to include(a2)
      expect(last.previous_activities).to include(a3)
      expect(last.previous_activities).to include(first.previous_activity)
    end
  end

  describe "validations" do
    it "validates complex non-cyclical graphs" do
      link1 = create(:link)
      link2 = create(:link)
      expect(create(:link, previous_activity: link1.next_activity, next_activity: link2.previous_activity)).to be_persisted
    end

    it "does not validate self-reference" do
      activity = create(:activity)
      expect { create(:link, next_activity: activity, previous_activity: activity) }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
