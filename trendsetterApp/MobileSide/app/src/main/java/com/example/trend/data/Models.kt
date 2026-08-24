package com.example.trend.data

data class TweetModel(
    val id: String,
    val userId: String,
    val userName: String,
    val userHandle: String,
    val userAvatarInitials: String,
    val avatarColor: Long,
    val content: String,
    val timestamp: String,
    val likeCount: Int,
    val retweetCount: Int,
    val replyCount: Int,
    val viewCount: String,
    val isLiked: Boolean = false,
    val isRetweeted: Boolean = false,
    val isBookmarked: Boolean = false,
    val isVerified: Boolean = false,
    val hasMedia: Boolean = false,
    val mediaGradientStart: Long = 0xFF1D9BF0,
    val mediaGradientEnd: Long = 0xFF794BC4,
    val trendingTag: String? = null
)

data class TrendingTopic(
    val id: String,
    val category: String,
    val hashtag: String,
    val tweetCount: String,
    val rank: Int,
    val isPromoted: Boolean = false
)

data class UserProfile(
    val id: String,
    val name: String,
    val handle: String,
    val bio: String,
    val location: String,
    val website: String,
    val joinDate: String,
    val followingCount: Int,
    val followersCount: String,
    val tweetsCount: Int,
    val avatarInitials: String,
    val avatarColor: Long,
    val headerGradientStart: Long,
    val headerGradientEnd: Long,
    val isVerified: Boolean = true
)

// Sample Data
object SampleData {

    val currentUser = UserProfile(
        id = "u1",
        name = "Alex Rivera",
        handle = "@alexrivera",
        bio = "📱 Tech enthusiast | Building the future one tweet at a time 🚀 | Views are my own",
        location = "San Francisco, CA",
        website = "alexrivera.dev",
        joinDate = "Joined January 2019",
        followingCount = 847,
        followersCount = "24.3K",
        tweetsCount = 4821,
        avatarInitials = "AR",
        avatarColor = 0xFF1D9BF0,
        headerGradientStart = 0xFF1D9BF0,
        headerGradientEnd = 0xFF794BC4,
        isVerified = true
    )

    val tweets = listOf(
        TweetModel(
            id = "t1",
            userId = "u2",
            userName = "Elon M.",
            userHandle = "@elonm",
            userAvatarInitials = "EM",
            avatarColor = 0xFF333333,
            content = "The thing I find most surprising about AGI is that almost nobody is talking about what comes after. We need a serious public conversation about this. 🤔",
            timestamp = "2h",
            likeCount = 48200,
            retweetCount = 12800,
            replyCount = 9400,
            viewCount = "12.4M",
            isVerified = true,
            trendingTag = "#AI"
        ),
        TweetModel(
            id = "t2",
            userId = "u3",
            userName = "TechCrunch",
            userHandle = "@techcrunch",
            userAvatarInitials = "TC",
            avatarColor = 0xFF0CBEF3,
            content = "🚀 BREAKING: New AI model just dropped and it's completely rewriting the rules of what's possible in natural language processing. Thread 🧵",
            timestamp = "4h",
            likeCount = 23500,
            retweetCount = 8900,
            replyCount = 3200,
            viewCount = "8.1M",
            isVerified = true,
            hasMedia = true,
            mediaGradientStart = 0xFF0CBEF3,
            mediaGradientEnd = 0xFF1D9BF0,
            trendingTag = "#TechNews"
        ),
        TweetModel(
            id = "t3",
            userId = "u4",
            userName = "Ava Chen",
            userHandle = "@avachen_dev",
            userAvatarInitials = "AC",
            avatarColor = 0xFFF91880,
            content = "Just shipped my first open-source project and it hit 1000 stars overnight! The dev community is absolutely incredible 🥹✨ Thank you all so much!",
            timestamp = "6h",
            likeCount = 15600,
            retweetCount = 2100,
            replyCount = 890,
            viewCount = "2.9M",
            isVerified = false,
            isLiked = true,
            trendingTag = "#OpenSource"
        ),
        TweetModel(
            id = "t4",
            userId = "u5",
            userName = "NASA",
            userHandle = "@nasa",
            userAvatarInitials = "NA",
            avatarColor = 0xFF0B3D91,
            content = "🌌 Stunning new images from the James Webb Space Telescope reveal star formation like we've never seen before. The universe continues to amaze us.",
            timestamp = "8h",
            likeCount = 98400,
            retweetCount = 34200,
            replyCount = 7800,
            viewCount = "45.2M",
            isVerified = true,
            hasMedia = true,
            mediaGradientStart = 0xFF0B3D91,
            mediaGradientEnd = 0xFF794BC4,
            trendingTag = "#Space"
        ),
        TweetModel(
            id = "t5",
            userId = "u6",
            userName = "Jordan K.",
            userHandle = "@jordankeys",
            userAvatarInitials = "JK",
            avatarColor = 0xFF00BA7C,
            content = "Hot take: The best productivity hack isn't waking up at 5am. It's being honest about your energy levels and working with your natural rhythm instead of fighting it.",
            timestamp = "10h",
            likeCount = 34700,
            retweetCount = 9800,
            replyCount = 4200,
            viewCount = "5.7M",
            isVerified = false,
            isRetweeted = true,
            trendingTag = "#Productivity"
        ),
        TweetModel(
            id = "t6",
            userId = "u7",
            userName = "Bloomberg",
            userHandle = "@bloomberg",
            userAvatarInitials = "BL",
            avatarColor = 0xFF1D9BF0,
            content = "📊 Markets update: S&P 500 hits all-time high as tech stocks surge. Here's what analysts are saying about the rally and what comes next.",
            timestamp = "12h",
            likeCount = 8900,
            retweetCount = 4500,
            replyCount = 1200,
            viewCount = "6.3M",
            isVerified = true,
            hasMedia = true,
            mediaGradientStart = 0xFF1D9BF0,
            mediaGradientEnd = 0xFF0A7CC7,
            trendingTag = "#Markets"
        ),
    )

    val trendingTopics = listOf(
        TrendingTopic("tr1", "Technology", "#ChatGPT5", "2.4M tweets", 1),
        TrendingTopic("tr2", "Science", "#JamesWebb", "890K tweets", 2),
        TrendingTopic("tr3", "Sports", "#WorldCup2026", "1.2M tweets", 3),
        TrendingTopic("tr4", "Entertainment", "#Oscars2026", "654K tweets", 4),
        TrendingTopic("tr5", "Politics", "#Election2026", "3.1M tweets", 5),
        TrendingTopic("tr6", "Technology", "#OpenSource", "445K tweets", 6),
        TrendingTopic("tr7", "Finance", "#Bitcoin", "1.8M tweets", 7),
        TrendingTopic("tr8", "Health", "#MentalHealth", "320K tweets", 8),
        TrendingTopic("tr9", "Music", "#Grammys", "789K tweets", 9, isPromoted = true),
        TrendingTopic("tr10", "Tech", "#AndroidDev", "234K tweets", 10),
    )
}
