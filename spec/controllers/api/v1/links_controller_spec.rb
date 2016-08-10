require 'rails_helper'

RSpec.describe Api::V1::LinksController, type: :controller do

  let(:link) { create(:link) }

  describe '#index' do
    it 'can return links' do
      new_link = link
      get :index
      expect(response).to be_success
      expect(assigns(:links)).to include(new_link)
    end
  end

  describe '#show' do
    it 'can render a link' do
      get :show, id: link.id
      expect(response).to be_success
    end
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
        expect(response).to be_success
      }.to change { Link.count }.from(0).to(1)
    end

    it 'renders an error if a duplicate link is created' do
      expect { post :create, hash }.to change { Link.count }.from(0).to(1)
      expect {
        post :create, hash
        expect(response).to_not be_success
      }.to_not raise_error
    end
  end

  describe '#update' do
    let(:hash) {
      {
        'data' => {
          'type' => 'links',
          'attributes' => {
            'description' => 'This is an updated link.'
          }
        }
      }
    }
    it 'can update link description' do
      put :update, hash.merge({ id: link.id })
      expect(response).to be_success
      link.reload
      expect(link.description).to eq("This is an updated link.")
    end
  end

  describe '#destroy' do
    it 'can destroy a link' do
      delete :destroy, id: link.id
      expect(response).to be_success
    end
  end
end
