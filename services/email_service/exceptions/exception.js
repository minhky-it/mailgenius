module.exports = class Exception extends Error {
    // Auth exceptions
    static LOGIN_SUCCESS = "Login success xxxx";
    static LOGIN_FAILED = "Login failed";
    static REGISTER_SUCCESS = "Register success";
    static REGISTER_FAILED = "Register failed";
    static FIND_USER_FAILED = "Find user failed";
    static USER_NOT_FOUND = "User not found";

    // Create email exception
    static CREATE_EMAIL_FAILED = "Create email failed";
    static EMAIL_NOT_FOUND = "Email not found";
    // Create news exception
    static CREATE_NEWS_FAILED = "Create news failed";
    static NEWS_NOT_FOUND = "News not found";
    // Create blog exception
    static CREATE_BLOG_FAILED = "Create blog failed";
    static BLOG_NOT_FOUND = "Blog not found";
    // Create comment exception
    static CREATE_COMMENT_FAILED = "Create comment failed";
    static COMMENT_NOT_FOUND = "Comment not found";
    // Create post exception
    static CREATE_POST_FAILED = "Create post failed";
    static POST_NOT_FOUND = "Post not found";
    // Create product exception
    static CREATE_PRODUCT_FAILED = "Create product failed";
    static PRODUCT_NOT_FOUND = "Product not found";
    // Create order exception
    static CREATE_ORDER_FAILED = "Create order failed";
    static ORDER_NOT_FOUND = "Order not found";
    // Create review exception
    static CREATE_REVIEW_FAILED = "Create review failed";
    static REVIEW_NOT_FOUND = "Review not found";
}