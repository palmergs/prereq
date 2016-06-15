require 'rails_helper'

RSpec.describe Activity, type: :model do
  it 'can be instantiated' do
    expect(Activity.new).to_not be_nil
  end

  it 'can be persisted' do
    expect(create(:activity)).to be_persisted
    expect(create(:activity)).to be_persisted
  end

  it 'finds all next activities' do

    a1 = create(:activity)
    a2 = create(:activity)
    a3 = create(:activity)
    create(:link, previous_activity: a1, next_activity: a2)
    create(:link, previous_activity: a2, next_activity: a3)

    expect(a1.next_activities.count).to eq(1)
    expect(a1.all_next_activities.count).to eq(2)

    expect(a3.previous_activities.count).to eq(1)
    expect(a3.all_previous_activities.count).to eq(2)

  end

  describe 'parents and children' do
    it 'can have parents and children' do
      a1 = create(:activity)
      a2 = create(:activity, parent: a1)

      a1.reload and a2.reload
      expect(a1.children.count).to eq(1)
      expect(a1.children).to include(a2)
      expect(a2.parent).to eq(a1)
    end
  end

  describe 'depth first ordering' do
    it 'can sort dependencies' do


      #   a1
      #    \
      # a2 -> a3 -> a4
      #        \ 
      # a0 -----> a5

      a0 = create(:activity, name: 'left 0')
      a1 = create(:activity, name: 'left 1')
      a2 = create(:activity, name: 'left 2')
      a3 = create(:activity, name: 'center')
      a4 = create(:activity, name: 'right 1')
      a5 = create(:activity, name: 'right 2')
      create(:link, previous_activity: a0, next_activity: a5)
      create(:link, previous_activity: a1, next_activity: a3)
      create(:link, previous_activity: a2, next_activity: a3)
      create(:link, previous_activity: a3, next_activity: a4)
      create(:link, previous_activity: a3, next_activity: a5)

      left_edges = Activity.no_previous_links
      expect(left_edges.count).to eq(3)

      ordered = Activity.kahn_algorithm(left_edges)
      expect(ordered.index(a1)).to be < ordered.index(a3)
      expect(ordered.index(a2)).to be < ordered.index(a3)

      expect(ordered.index(a0)).to be < ordered.index(a5)

      expect(ordered.index(a3)).to be < ordered.index(a4)
      expect(ordered.index(a3)).to be < ordered.index(a5)

    end
  end
end
