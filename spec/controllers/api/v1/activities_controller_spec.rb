require 'rails_helper'

RSpec.describe Api::V1::ActivitiesController, type: :controller do

  describe '#index' do
    it 'can return activities' do
      create(:activity)
      get :index
      expect(response).to be_success
    end
  end

  describe '#show' do

  end

  describe '#create' do
    let(:hash) {
      {
        'data' => {
          'type' => 'activities',
          'attributes' => {
            'name' => 'Activity 1',
            'description' => 'This is a new activity.'
          }
        }
      }
    }

    it 'can create a new activity from a hash' do
      expect {
        post :create, hash
        expect(response).to be_success
      }.to change { Activity.count }.from(0).to(1)
    end
  end

  describe '#update' do

  end

  describe '#destroy' do

  end
end
