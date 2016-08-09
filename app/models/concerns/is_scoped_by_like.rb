module Concerns
  module IsScopedByLike
    extend ActiveSupport::Concern

    SANITIZE_FOR_LIKE_PATTERN = Regexp.union('\\', '%', '_')

    class_methods do
      def sanitize_for_like str
        return str unless str
        str.to_s.gsub(SANITIZE_FOR_LIKE_PATTERN) {|x| [ '\\', x ].join }
      end
    end
  end
end
