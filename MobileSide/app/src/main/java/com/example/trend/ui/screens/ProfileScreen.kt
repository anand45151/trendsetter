package com.example.trend.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.trend.data.SampleData
import com.example.trend.ui.components.*
import com.example.trend.ui.theme.*

@Composable
fun ProfileScreen(
    currentRoute: String,
    onNavigate: (String) -> Unit
) {
    val user = SampleData.currentUser
    val userTweets = SampleData.tweets.take(4)
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Tweets", "Replies", "Media", "Likes")

    Scaffold(
        containerColor = BackgroundPrimary,
        bottomBar = {
            TrendBottomBar(
                currentRoute = currentRoute,
                onNavigate = onNavigate
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Header: cover + avatar + action buttons
            item {
                ProfileHeader(
                    user = user,
                    selectedTab = selectedTab,
                    tabs = tabs,
                    onTabSelected = { selectedTab = it }
                )
            }

            // Tweets
            when (selectedTab) {
                0 -> {
                    items(userTweets) { tweet ->
                        TweetCard(
                            tweet = tweet,
                            onLike = { },
                            onRetweet = { },
                            onReply = { },
                            onBookmark = { }
                        )
                    }
                }
                2 -> {
                    items(userTweets.filter { it.hasMedia }) { tweet ->
                        TweetCard(
                            tweet = tweet,
                            onLike = { },
                            onRetweet = { },
                            onReply = { },
                            onBookmark = { }
                        )
                    }
                }
                3 -> {
                    items(userTweets.filter { it.isLiked }) { tweet ->
                        TweetCard(
                            tweet = tweet,
                            onLike = { },
                            onRetweet = { },
                            onReply = { },
                            onBookmark = { }
                        )
                    }
                }
                else -> {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(40.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "No content yet",
                                color = TextSecondary,
                                style = MaterialTheme.typography.bodyMedium
                            )
                        }
                    }
                }
            }

            item { Spacer(Modifier.height(24.dp)) }
        }
    }
}

@Composable
private fun ProfileHeader(
    user: com.example.trend.data.UserProfile,
    selectedTab: Int,
    tabs: List<String>,
    onTabSelected: (Int) -> Unit
) {
    Column {
        // Back/More row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .statusBarsPadding()
                .padding(horizontal = 4.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            IconButton(onClick = { }) {
                Icon(
                    imageVector = Icons.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = TextPrimary
                )
            }
            Row {
                IconButton(onClick = { }) {
                    Icon(
                        imageVector = Icons.Outlined.Search,
                        contentDescription = "Search",
                        tint = TextPrimary
                    )
                }
                IconButton(onClick = { }) {
                    Icon(
                        imageVector = Icons.Outlined.MoreVert,
                        contentDescription = "More",
                        tint = TextPrimary
                    )
                }
            }
        }

        // Cover photo (gradient header)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(130.dp)
                .background(
                    brush = Brush.linearGradient(
                        colors = listOf(
                            Color(user.headerGradientStart),
                            Color(user.headerGradientEnd)
                        )
                    )
                )
        ) {
            // Stars overlay
            repeat(12) { i ->
                Box(
                    modifier = Modifier
                        .offset(
                            x = ((i * 73 % 340) + 10).dp,
                            y = ((i * 37 % 100) + 10).dp
                        )
                        .size(if (i % 3 == 0) 4.dp else 2.dp)
                        .clip(CircleShape)
                        .background(Color.White.copy(alpha = 0.4f))
                )
            }
        }

        // Avatar + Edit button row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Top
        ) {
            // Avatar overlapping the header
            Box(
                modifier = Modifier
                    .offset(y = (-40).dp)
                    .size(84.dp)
                    .clip(CircleShape)
                    .border(4.dp, BackgroundPrimary, CircleShape)
                    .clip(CircleShape)
                    .background(Color(user.avatarColor)),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = user.avatarInitials,
                    color = Color.White,
                    fontSize = 32.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            Spacer(Modifier.width(12.dp))

            // Edit Profile button
            OutlinedButton(
                onClick = { },
                modifier = Modifier
                    .padding(top = 12.dp),
                border = ButtonDefaults.outlinedButtonBorder.copy(
                    width = 1.dp,
                ),
                shape = RoundedCornerShape(24.dp),
                colors = ButtonDefaults.outlinedButtonColors(
                    contentColor = TextPrimary
                )
            ) {
                Text(
                    text = "Edit profile",
                    style = MaterialTheme.typography.labelLarge,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        Spacer(modifier = Modifier.height((-28).dp))

        // User info
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp)
        ) {
            // Name + verified
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Text(
                    text = user.name,
                    style = MaterialTheme.typography.headlineMedium.copy(
                        fontWeight = FontWeight.ExtraBold
                    ),
                    color = TextPrimary
                )
                if (user.isVerified) {
                    VerifiedBadge(size = 20)
                }
            }

            Text(
                text = user.handle,
                style = MaterialTheme.typography.bodyMedium,
                color = TextSecondary
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Bio
            Text(
                text = user.bio,
                style = MaterialTheme.typography.bodyLarge,
                color = TextPrimary,
                lineHeight = 22.sp
            )

            Spacer(modifier = Modifier.height(10.dp))

            // Meta info row
            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                ProfileMetaItem(
                    icon = Icons.Outlined.LocationOn,
                    text = user.location
                )
                ProfileMetaItem(
                    icon = Icons.Outlined.Link,
                    text = user.website,
                    isLink = true
                )
            }

            Spacer(modifier = Modifier.height(4.dp))

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Icon(
                    imageVector = Icons.Outlined.CalendarMonth,
                    contentDescription = null,
                    tint = TextSecondary,
                    modifier = Modifier.size(14.dp)
                )
                Text(
                    text = user.joinDate,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Following / Followers
            Row(horizontalArrangement = Arrangement.spacedBy(20.dp)) {
                StatItem(count = "${user.followingCount}", label = "Following")
                StatItem(count = user.followersCount, label = "Followers")
                StatItem(count = "${user.tweetsCount}", label = "Tweets")
            }

            Spacer(modifier = Modifier.height(16.dp))
        }

        // Profile Tab Row
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = Color.Transparent,
            contentColor = TextPrimary,
            indicator = { tabPositions ->
                if (selectedTab < tabPositions.size) {
                    Box(
                        modifier = Modifier
                            .tabIndicatorOffset(tabPositions[selectedTab])
                            .height(2.dp)
                            .padding(horizontal = 28.dp)
                            .clip(RoundedCornerShape(2.dp))
                            .background(TrendBlue)
                    )
                }
            },
            divider = {
                HorizontalDivider(color = DividerColor, thickness = 0.5.dp)
            }
        ) {
            tabs.forEachIndexed { index, tab ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { onTabSelected(index) },
                    modifier = Modifier.height(44.dp)
                ) {
                    Text(
                        text = tab,
                        style = MaterialTheme.typography.labelLarge.copy(
                            fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal
                        ),
                        color = if (selectedTab == index) TextPrimary else TextSecondary
                    )
                }
            }
        }
    }
}

@Composable
private fun ProfileMetaItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    text: String,
    isLink: Boolean = false
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = TextSecondary,
            modifier = Modifier.size(14.dp)
        )
        Text(
            text = text,
            style = MaterialTheme.typography.bodySmall,
            color = if (isLink) TrendBlue else TextSecondary
        )
    }
}

@Composable
private fun StatItem(count: String, label: String) {
    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
        Text(
            text = count,
            style = MaterialTheme.typography.titleSmall,
            color = TextPrimary,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = label,
            style = MaterialTheme.typography.titleSmall,
            color = TextSecondary
        )
    }
}
