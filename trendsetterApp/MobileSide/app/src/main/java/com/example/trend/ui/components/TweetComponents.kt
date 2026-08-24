package com.example.trend.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.trend.data.TweetModel
import com.example.trend.ui.theme.*

// ─── Avatar Component ──────────────────────────────────────────────────────────

@Composable
fun UserAvatar(
    initials: String,
    colorValue: Long,
    size: Int = 44,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .size(size.dp)
            .clip(CircleShape)
            .background(Color(colorValue)),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = initials,
            color = Color.White,
            fontSize = (size / 3).sp,
            fontWeight = FontWeight.Bold
        )
    }
}

// ─── Verified Badge ────────────────────────────────────────────────────────────

@Composable
fun VerifiedBadge(size: Int = 16) {
    Icon(
        imageVector = Icons.Filled.Verified,
        contentDescription = "Verified",
        tint = TrendBlue,
        modifier = Modifier.size(size.dp)
    )
}

// ─── Tweet Card ────────────────────────────────────────────────────────────────

@Composable
fun TweetCard(
    tweet: TweetModel,
    onLike: (String) -> Unit,
    onRetweet: (String) -> Unit,
    onReply: (String) -> Unit,
    onBookmark: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    var isLiked by remember { mutableStateOf(tweet.isLiked) }
    var isRetweeted by remember { mutableStateOf(tweet.isRetweeted) }
    var isBookmarked by remember { mutableStateOf(tweet.isBookmarked) }
    var likeCount by remember { mutableStateOf(tweet.likeCount) }
    var retweetCount by remember { mutableStateOf(tweet.retweetCount) }

    val likeScale by animateFloatAsState(
        targetValue = if (isLiked) 1.2f else 1f,
        animationSpec = spring(dampingRatio = 0.4f),
        label = "likeScale"
    )

    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(BackgroundPrimary)
            .clickable { }
            .padding(horizontal = 16.dp, vertical = 12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Avatar
            UserAvatar(
                initials = tweet.userAvatarInitials,
                colorValue = tweet.avatarColor
            )

            Column(modifier = Modifier.weight(1f)) {
                // User info row
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Text(
                        text = tweet.userName,
                        style = MaterialTheme.typography.titleSmall.copy(
                            fontWeight = FontWeight.Bold
                        ),
                        color = TextPrimary,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                        modifier = Modifier.weight(1f, fill = false)
                    )
                    if (tweet.isVerified) {
                        VerifiedBadge()
                    }
                    Text(
                        text = "${tweet.userHandle} · ${tweet.timestamp}",
                        style = MaterialTheme.typography.bodySmall,
                        color = TextSecondary,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                        modifier = Modifier.weight(1f, fill = false)
                    )
                    Spacer(modifier = Modifier.weight(1f))
                    Icon(
                        imageVector = Icons.Outlined.MoreHoriz,
                        contentDescription = "More",
                        tint = TextSecondary,
                        modifier = Modifier.size(18.dp)
                    )
                }

                Spacer(modifier = Modifier.height(4.dp))

                // Tweet content
                Text(
                    text = tweet.content,
                    style = MaterialTheme.typography.bodyLarge,
                    color = TextPrimary,
                    lineHeight = 22.sp
                )

                // Media placeholder
                if (tweet.hasMedia) {
                    Spacer(modifier = Modifier.height(10.dp))
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(180.dp)
                            .clip(RoundedCornerShape(16.dp))
                            .background(
                                brush = Brush.linearGradient(
                                    colors = listOf(
                                        Color(tweet.mediaGradientStart),
                                        Color(tweet.mediaGradientEnd)
                                    )
                                )
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Image,
                            contentDescription = "Media",
                            tint = Color.White.copy(alpha = 0.6f),
                            modifier = Modifier.size(48.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Action buttons row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    // Reply
                    TweetAction(
                        icon = Icons.Outlined.ChatBubbleOutline,
                        count = formatCount(tweet.replyCount),
                        color = TextSecondary,
                        onClick = { onReply(tweet.id) }
                    )

                    // Retweet
                    TweetAction(
                        icon = if (isRetweeted) Icons.Filled.Repeat else Icons.Outlined.Repeat,
                        count = formatCount(retweetCount),
                        color = if (isRetweeted) RetweetGreen else TextSecondary,
                        onClick = {
                            isRetweeted = !isRetweeted
                            retweetCount += if (isRetweeted) 1 else -1
                            onRetweet(tweet.id)
                        },
                        scale = if (isRetweeted) 1.1f else 1f
                    )

                    // Like
                    TweetAction(
                        icon = if (isLiked) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                        count = formatCount(likeCount),
                        color = if (isLiked) LikeRed else TextSecondary,
                        onClick = {
                            isLiked = !isLiked
                            likeCount += if (isLiked) 1 else -1
                            onLike(tweet.id)
                        },
                        scale = likeScale
                    )

                    // Views
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Outlined.BarChart,
                            contentDescription = "Views",
                            tint = TextSecondary,
                            modifier = Modifier.size(16.dp)
                        )
                        Text(
                            text = tweet.viewCount,
                            style = MaterialTheme.typography.labelSmall,
                            color = TextSecondary
                        )
                    }

                    // Bookmark
                    Icon(
                        imageVector = if (isBookmarked) Icons.Filled.Bookmark else Icons.Outlined.BookmarkBorder,
                        contentDescription = "Bookmark",
                        tint = if (isBookmarked) TrendBlue else TextSecondary,
                        modifier = Modifier
                            .size(18.dp)
                            .clickable(
                                interactionSource = remember { MutableInteractionSource() },
                                indication = null
                            ) {
                                isBookmarked = !isBookmarked
                                onBookmark(tweet.id)
                            }
                    )
                }
            }
        }

        // Divider
        Spacer(modifier = Modifier.height(12.dp))
        HorizontalDivider(
            color = DividerColor,
            thickness = 0.5.dp
        )
    }
}

@Composable
private fun TweetAction(
    icon: ImageVector,
    count: String,
    color: Color,
    onClick: () -> Unit,
    scale: Float = 1f
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        modifier = Modifier
            .scale(scale)
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = null
            ) { onClick() }
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = color,
            modifier = Modifier.size(18.dp)
        )
        Text(
            text = count,
            style = MaterialTheme.typography.labelSmall,
            color = color
        )
    }
}

private fun formatCount(count: Int): String {
    return when {
        count >= 1_000_000 -> "${count / 1_000_000}.${(count % 1_000_000) / 100_000}M"
        count >= 1_000 -> "${count / 1_000}.${(count % 1_000) / 100}K"
        else -> count.toString()
    }
}

// ─── Bottom Navigation Bar ─────────────────────────────────────────────────────

data class NavItem(
    val label: String,
    val icon: ImageVector,
    val activeIcon: ImageVector,
    val route: String,
    val badgeCount: Int = 0
)

@Composable
fun TrendBottomBar(
    currentRoute: String,
    onNavigate: (String) -> Unit
) {
    val navItems = listOf(
        NavItem("Home", Icons.Outlined.Home, Icons.Filled.Home, "home"),
        NavItem("Explore", Icons.Outlined.Search, Icons.Filled.Search, "trending"),
        NavItem("Notifications", Icons.Outlined.Notifications, Icons.Filled.Notifications, "notifications", badgeCount = 3),
        NavItem("Profile", Icons.Outlined.Person, Icons.Filled.Person, "profile"),
    )

    Surface(
        color = BackgroundPrimary,
        tonalElevation = 0.dp,
        modifier = Modifier
            .fillMaxWidth()
            .border(
                width = 0.5.dp,
                color = DividerColor,
                shape = RoundedCornerShape(0.dp)
            )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp)
                .navigationBarsPadding(),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            navItems.forEach { item ->
                val isActive = currentRoute == item.route
                val iconColor by animateColorAsState(
                    targetValue = if (isActive) TextPrimary else TextSecondary,
                    label = "navColor"
                )

                Box(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxHeight()
                        .clickable(
                            interactionSource = remember { MutableInteractionSource() },
                            indication = null
                        ) { onNavigate(item.route) },
                    contentAlignment = Alignment.Center
                ) {
                    BadgedBox(
                        badge = {
                            if (item.badgeCount > 0) {
                                Badge(
                                    containerColor = BadgeRed
                                ) {
                                    Text(
                                        text = item.badgeCount.toString(),
                                        style = MaterialTheme.typography.labelSmall,
                                        color = Color.White
                                    )
                                }
                            }
                        }
                    ) {
                        Icon(
                            imageVector = if (isActive) item.activeIcon else item.icon,
                            contentDescription = item.label,
                            tint = iconColor,
                            modifier = Modifier.size(26.dp)
                        )
                    }
                }
            }
        }
    }
}

// ─── Section Header ────────────────────────────────────────────────────────────

@Composable
fun SectionHeader(text: String, modifier: Modifier = Modifier) {
    Text(
        text = text,
        style = MaterialTheme.typography.headlineSmall,
        color = TextPrimary,
        modifier = modifier
            .fillMaxWidth()
            .background(BackgroundPrimary)
            .padding(horizontal = 16.dp, vertical = 12.dp)
    )
}

// ─── Gradient Button ───────────────────────────────────────────────────────────

@Composable
fun GradientButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(24.dp))
            .background(
                brush = Brush.horizontalGradient(
                    colors = listOf(TrendBlue, PurpleAccent)
                )
            )
            .clickable { onClick() }
            .padding(horizontal = 20.dp, vertical = 10.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.labelLarge,
            color = Color.White,
            fontWeight = FontWeight.Bold
        )
    }
}
