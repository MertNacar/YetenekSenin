
CREATE TABLE tblTalent(
talentID INT PRIMARY KEY IDENTITY,
talentName VARCHAR(30)
)

--CREATE TABLE tblSubTalent(
--subTalentID INT PRIMARY KEY IDENTITY,
--fTalentID INT FOREIGN KEY REFERENCES tblTalent(talentID) NOT NULL,
--subTalentName VARCHAR(30)
--)

 CREATE TABLE tblCity (
 code INT PRIMARY KEY,
 city nvarchar(50) NOT NULL
 
) 
 CREATE TABLE tblUser (
userID INT PRIMARY KEY IDENTITY,
firstname VARCHAR(20),
surname VARCHAR(20),
username VARCHAR(24) NOT NULL,
password VARCHAR(140) NOT NULL,
phone VARCHAR(12) NOT NULL,
aboutMe VARCHAR(40),
fCity INT FOREIGN KEY REFERENCES tblCity(code),
gender CHAR(1) DEFAULT 'u',-- f -> female / m -> male / u -> unknown
--isMentor BIT DEFAULT 0,
birthday DATETIME,
profilePhoto VARCHAR(MAX),
socialMedia VARCHAR(150),
email VARCHAR(40),
allStars INT DEFAULT 0,
allVotes INT DEFAULT 0,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
--fSubTalentID INT FOREIGN KEY REFERENCES tblSubTalent(subTalentID),
--fTalentID INT FOREIGN KEY REFERENCES tblTalent(TalentID)
)

CREATE TABLE tblCompetition(
competitionID INT PRIMARY KEY IDENTITY,
competitionTitle VARCHAR(50) NOT NULL,
competitionDescription VARCHAR(150) NOT NULL,
competitionVoteCount INT DEFAULT 0,
competitionWatchCount INT DEFAULT 0,
competitionIsFinish BIT DEFAULT 0,
competitionStartDate DATETIME NOT NULL,
competitionFinishDate DATETIME,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
fTalentID INT FOREIGN KEY REFERENCES tblTalent(talentID),
)

CREATE TABLE tblVideo(
videoID INT PRIMARY KEY IDENTITY,
videoPath VARCHAR(150) NOT NULL,
videoDescription VARCHAR(150) NOT NULL,
videoTitle VARCHAR(30) NOT NULL,
videoWatchCount INT DEFAULT 0,
videoStarCount INT DEFAULT 0,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
--fVTalentID INT FOREIGN KEY REFERENCES tblTalent(talentID) NOT NULL,
--fUserID INT FOREIGN KEY REFERENCES tblUser(userID) NOT NULL,
--fVSubTalentID INT FOREIGN KEY REFERENCES tblSubTalent(subTalentID) NOT NULL,
)


CREATE TABLE tblComment (
commentID INT PRIMARY KEY IDENTITY,
commentDescription VARCHAR(150) NOT NULL,
commentLikeCount INT DEFAULT 0,
createdAt DATETIME NOT NULL,
updatedAt DATETIME NOT NULL,
fUserID INT FOREIGN KEY REFERENCES tblUser(userID) NOT NULL,
fVideoID INT FOREIGN KEY REFERENCES tblVideo(videoID) NOT NULL
 )

 CREATE TABLE tblFollowers(
 followID INT PRIMARY KEY IDENTITY, 
 userID INT FOREIGN KEY REFERENCES tblUser(userID) NOT NULL,
 followerID INT FOREIGN KEY REFERENCES tblUser(userID) NOT NULL,
 isFollow BIT DEFAULT 1,
 isBlock BIT DEFAULT 0,
 createdAt DATETIME NOT NULL,
 updatedAt DATETIME NOT NULL,
 CONSTRAINT FollowsPK UNIQUE (userID,followerID)
 )

 CREATE TABLE tblStarVideo(
 starVideoID INT PRIMARY KEY IDENTITY, 
 userID INT FOREIGN KEY REFERENCES tblUser(userID) NOT NULL,
 videoID INT FOREIGN KEY REFERENCES tblVideo(videoID) NOT NULL,
 isLike BIT DEFAULT 1,
 createdAt DATETIME NOT NULL,
 updatedAt DATETIME NOT NULL,
 CONSTRAINT StarsPK UNIQUE (userID,videoID)
 )

 CREATE TABLE tblUserCompetition(
 userCompetitionID INT PRIMARY KEY IDENTITY, 
 competitionID INT FOREIGN KEY REFERENCES tblCompetition(competitionID) NOT NULL,
 userID INT FOREIGN KEY REFERENCES tblUser(userID) NOT NULL,
 uploadVideoID INT FOREIGN KEY REFERENCES tblVideo(videoID),
 voteVideoID INT FOREIGN KEY REFERENCES tblVideo(videoID),
 createdAt DATETIME NOT NULL,
 updatedAt DATETIME NOT NULL, 
 CONSTRAINT joinCompetitionID UNIQUE (competitionID,userID)
 )

 --CREATE TABLE tblUserCompetition(
 --userCompetitionID INT PRIMARY KEY IDENTITY, 
 --competitionID INT FOREIGN KEY REFERENCES tblCompetition(competitionID),
 --userID INT FOREIGN KEY REFERENCES tblUser(userID),
 --videoID INT FOREIGN KEY REFERENCES tblVideo(videoID),
 --createdAt DATETIME NOT NULL,
 --updatedAt DATETIME NOT NULL, 
 --CONSTRAINT joinCompetitionID UNIQUE (competitionID,userID)
 --)

 --CREATE TABLE tblVoteUser(
 --voteUserID INT PRIMARY KEY IDENTITY, 
 --competitionID INT FOREIGN KEY REFERENCES tblCompetition(competitionID),
 --userID INT FOREIGN KEY REFERENCES tblUser(userID),
 --videoID INT FOREIGN KEY REFERENCES tblVideo(videoID),
 --createdAt DATETIME NOT NULL,
 --updatedAt DATETIME NOT NULL, 
 --CONSTRAINT voteCompetitionID UNIQUE (competitionID,userID)
 --)


