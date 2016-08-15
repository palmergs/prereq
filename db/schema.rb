# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160815111720) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string   "name",                                            null: false
    t.text     "description",                     default: "",    null: false
    t.integer  "parent_id"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.integer  "previous_links_count",            default: 0,     null: false
    t.integer  "next_links_count",                default: 0,     null: false
    t.integer  "child_count",                     default: 0,     null: false
    t.string   "status",               limit: 24, default: "new", null: false
    t.boolean  "completed",                       default: false, null: false
    t.datetime "activity_at"
    t.integer  "pin",                             default: 0,     null: false
    t.integer  "duration_secs"
  end

  add_index "activities", ["activity_at"], name: "index_activities_on_activity_at", using: :btree
  add_index "activities", ["child_count"], name: "index_activities_on_child_count", using: :btree
  add_index "activities", ["completed"], name: "index_activities_on_completed", using: :btree
  add_index "activities", ["duration_secs"], name: "index_activities_on_duration_secs", using: :btree
  add_index "activities", ["next_links_count"], name: "index_activities_on_next_links_count", using: :btree
  add_index "activities", ["parent_id"], name: "index_activities_on_parent_id", using: :btree
  add_index "activities", ["previous_links_count"], name: "index_activities_on_previous_links_count", using: :btree
  add_index "activities", ["status"], name: "index_activities_on_status", using: :btree

  create_table "links", force: :cascade do |t|
    t.integer  "previous_activity_id",              null: false
    t.integer  "next_activity_id",                  null: false
    t.text     "description",          default: "", null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  add_index "links", ["next_activity_id"], name: "index_links_on_next_activity_id", using: :btree
  add_index "links", ["previous_activity_id", "next_activity_id"], name: "index_links_on_previous_activity_id_and_next_activity_id", unique: true, using: :btree
  add_index "links", ["previous_activity_id"], name: "index_links_on_previous_activity_id", using: :btree

end
