require 'rails_helper'

RSpec.describe Api::V1::LinksController, type: :controller do

  describe '#index' do
    it 'can return links' do
      create(:link)
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
          'type' => 'links',
          'attributes' => {
            'description' => 'This is a new link'
          },
          'relationships' => {
            'next-activity' => {
              'data' => {
                'type' => 'activities',
                'id' => create(:activity).id
              }
            },
            'previous-activity' => {
              'data' => {
                'type' => 'activities',
                'id' => create(:activity).id
              }
            }
          }
        }
      }
    }

    it 'can create a new link from a hash' do
      expect {
        post :create, hash
        # expect(response).to be_success
      }.to change { Link.count }.from(0).to(1)
    end
  end

  describe '#update' do

  end

  describe '#destroy' do

  end
end
