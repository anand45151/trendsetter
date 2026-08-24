package com.example.trend.ui.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.trend.data.SampleData
import com.example.trend.ui.components.*
import com.example.trend.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    currentRoute: String,
    onNavigate: (String) -> Unit
) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("For You", "Following")
    val listState = rememberLazyListState()
    var showFab by remember { mutableStateOf(true) }
    var tweetsList by remember { mutableStateOf(SampleData.tweets) }

    // Hide FAB on scroll down
    LaunchedEffect(listState.firstVisibleItemIndex) {
        showFab = listState.firstVisibleItemIndex == 0 ||
                  listState.firstVisibleItemScrollOffset == 0
    }

    Scaffold(
        containerColor = BackgroundPrimary,
        topBar = {
            HomeTopBar(
                selectedTab = selectedTab,
                tabs = tabs,
                onTabSelected = { selectedTab = it }
            )
        },
        bottomBar = {
            TrendBottomBar(
                currentRoute = currentRoute,
                onNavigate = onNavigate
            )
        },
        floatingActionButton = {
            AnimatedVisibility(
                visible = showFab,
                enter = scaleIn() + fadeIn(),
                exit = scaleOut() + fadeOut()
            ) {
                Box(
                    modifier = Modifier
                        .size(56.dp)
                        .clip(CircleShape)
                        .background(
                            brush = Brush.linearGradient(
                                colors = listOf(TrendBlue, PurpleAccent)
                            )
                        )
                        .clickable { },
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.Edit,
                        contentDescription = "Tweet",
                        tint = Color.White,
                        modifier = Modifier.size(24.dp)
                    )
                }
            }
        }
    ) { paddingValues ->
        LazyColumn(
            state = listState,
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            contentPadding = PaddingValues(bottom = 16.dp)
        ) {
            // Story / Suggestion Row
            item {
                StoryRow()
            }

            // Tweet cards
            items(
                items = tweetsList,
                key = { it.id }
            ) { tweet ->
                TweetCard(
                    tweet = tweet,
                    onLike = { id ->
                        tweetsList = tweetsList.map {
                            if (it.id == id) it.copy(isLiked = !it.isLiked) else it
                        }
                    },
                    onRetweet = { id ->
                        tweetsList = tweetsList.map {
                            if (it.id == id) it.copy(isRetweeted = !it.isRetweeted) else it
                        }
                    },
                    onReply = { },
                    onBookmark = { id ->
                        tweetsList = tweetsList.map {
                            if (it.id == id) it.copy(isBookmarked = !it.isBookmarked) else it
                        }
                    }
                )
            }

            // Load more indicator
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(24.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(
                        color = TrendBlue,
                        modifier = Modifier.size(24.dp),
                        strokeWidth = 2.dp
                    )
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun HomeTopBar(
    selectedTab: Int,
    tabs: List<String>,
    onTabSelected: (Int) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(BackgroundPrimary.copy(alpha = 0.95f))
    ) {
        // Top row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .statusBarsPadding()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            // User avatar (left)
            UserAvatar(
                initials = SampleData.currentUser.avatarInitials,
                colorValue = SampleData.currentUser.avatarColor,
                size = 36
            )

            // Logo center
            Box(
                modifier = Modifier
                    .size(34.dp)
                    .clip(CircleShape)
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(TrendBlue, PurpleAccent)
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "T",
                    color = Color.White,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.ExtraBold
                )
            }

            // Settings (right)
            Icon(
                imageVector = Icons.Outlined.Tune,
                contentDescription = "Settings",
                tint = TextPrimary,
                modifier = Modifier.size(24.dp)
            )
        }

        // Tab Row
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
                            .padding(horizontal = 32.dp)
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
                    modifier = Modifier.height(48.dp)
                ) {
                    Text(
                        text = tab,
                        style = MaterialTheme.typography.titleSmall.copy(
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
private fun StoryRow() {
    val stories = listOf(
        Triple("You", SampleData.currentUser.avatarInitials, SampleData.currentUser.avatarColor),
        Triple("Elon M.", "EM", 0xFF333333L),
        Triple("NASA", "NA", 0xFF0B3D91L),
        Triple("TechCrunch", "TC", 0xFF0CBEF3L),
        Triple("Ava Chen", "AC", 0xFFF91880L),
        Triple("Bloomberg", "BL", 0xFF1D9BF0L),
    )

    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier
            .fillMaxWidth()
            .background(BackgroundPrimary)
    ) {
        items(stories) { (name, initials, color) ->
            StoryItem(name = name, initials = initials, color = color)
        }
    }

    HorizontalDivider(color = DividerColor, thickness = 0.5.dp)
}

@Composable
private fun StoryItem(name: String, initials: String, color: Long) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        Box(contentAlignment = Alignment.BottomEnd) {
            Box(
                modifier = Modifier
                    .size(52.dp)
                    .clip(CircleShape)
                    .border(
                        width = 2.dp,
                        brush = Brush.linearGradient(
                            colors = listOf(TrendBlue, PurpleAccent)
                        ),
                        shape = CircleShape
                    )
                    .padding(2.dp)
            ) {
                UserAvatar(
                    initials = initials,
                    colorValue = color,
                    size = 48
                )
            }
            if (name == "You") {
                Box(
                    modifier = Modifier
                        .size(18.dp)
                        .clip(CircleShape)
                        .background(TrendBlue)
                        .border(2.dp, BackgroundPrimary, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.Add,
                        contentDescription = "Add story",
                        tint = Color.White,
                        modifier = Modifier.size(10.dp)
                    )
                }
            }
        }
        Text(
            text = name,
            style = MaterialTheme.typography.labelSmall,
            color = TextSecondary
        )
    }
}
