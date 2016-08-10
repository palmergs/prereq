require 'rails_helper'

RSpec.describe Api::V1::ActivitiesController, type: :controller do

  let(:activity) { create(:activity) }

  describe '#index' do
    it 'can return activities' do
      new_activity = activity
      get :index
      expect(response).to be_success
      expect(assigns(:activities)).to include(new_activity)
    end
  end

  describe '#show' do
    it 'renders error json if not found' do
      expect {
        get :show, id: 0
        expect(response).to_not be_success
        expect(response.body).to include 'Record not found'
      }.to_not raise_error
    end

    it 'can render an activity' do
      get :show, id: activity.id
      expect(response).to be_success
    end
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

    it 'fails to build an activity without a name' do
      post :create, { 'data' => { 'type' => 'activities', 'attributes' => { 'description' => 'Test' }}}
      expect(response).to_not be_success
    end
  end

  describe '#update' do
    let(:hash) {
      { 'data' => { 'type' => 'activities', 'attributes' => { 'description' => 'Test' }}}
    }
    it 'can update an activity' do
      put :update, hash.merge({ id: activity.id })
      expect(response).to be_success
      activity.reload
      expect(activity.description).to eq('Test')
    end
  end

  describe '#destroy' do
    it 'can destroy an activity (and associated links)' do
      link = create(:link)
      to_delete = link.previous_activity
      unmodified = link.next_activity
      delete :destroy, id: to_delete.id
      expect(response).to be_success
      expect { Link.find(link.id) }.to raise_error(ActiveRecord::RecordNotFound)
      expect { Activity.find(to_delete.id) }.to raise_error(ActiveRecord::RecordNotFound)
      expect(Activity.find(unmodified.id)).to eq(unmodified)
    end
  end
end
