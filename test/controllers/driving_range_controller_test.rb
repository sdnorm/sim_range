require "test_helper"

class DrivingRangeControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get driving_range_home_url
    assert_response :success
  end
end
