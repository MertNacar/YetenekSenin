INSERT INTO tblTalent VALUES('Spor'),
							('Müzik'),
							('Dans'),
							('Resim'),
							('Edebiyat')

--INSERT INTO tblSubTalent VALUES (1,'Futbol'),
--								(1,'Basketbol'),
--								(1,'Voleybol'),
--								(2,'Pop'),
--								(2,'Jazz'),
--								(2,'R&B'),
--								(2,'Arabesk'),
--								(2,'Rap'),
--								(3,'Sambo'),
--								(3,'Tango'),
--								(3,'Vals'),
--								(3,'Salsa'),
--								(4,'Figür'),
--								(4,'Portre'),
--								(4,'Natürmort'),
--								(4,'Teknik Resim'),
--								(5,'Siir'),
--								(5,'Mani'),
--								(5,'Düz Yazi')
								
INSERT INTO tblCity VALUES
(1,N'Adana'),
(2,N'Adıyaman'),
(3,N'Afyon'),
(4,N'Ağrı'),
(5,N'Amasya'),
(6,N'Ankara'),
(7,N'Antalya'),
(8,N'Artvin'),
(09, N'Aydın'),
(10, N'Balıkesir'),
(11, N'Bilecik'),
(12, N'Bingöl'),
(13, N'Bitlis'),
(14, N'Bolu'),
(15, N'Burdur'),
(16, N'Bursa'),
(17, N'Çanakkale'),
(18, N'Çankırı'),
(19, N'Çorum'),
(20, N'Denizli'),
(21, N'Diyarbakır'),
(22, N'Edirne'),
(23, N'Elazığ'),
(24, N'Erzincan'),
(25, N'Erzurum'),
(26, N'Eskişehir'),
(27, N'Gaziantep'),
(28, N'Giresun'),
(29, N'Gümüşhane'),
(30, N'Hakkari'),
(31, N'Hatay'),
(32, N'Isparta'),
(33, N'Mersin'),
(34, N'İstanbul'),
(35, N'İzmir'),
(36, N'Kars'),
(37, N'Kastamonu'),
(38, N'Kayseri'),
(39, N'Kırklareli'),
(40, N'Kırşehir'),
(41, N'Kocaeli'),
(42, N'Konya'),
(43, N'Kütahya'),
(44, N'Malatya'),
(45, N'Manisa'),
(46, N'K.Maraş'),
(47, N'Mardin'),
(48, N'Muğla'),
(49, N'Muş'),
(50, N'Nevşehir'),
(51, N'Niğde'),
(52, N'Ordu'),
(53, N'Rize'),
(54, N'Sakarya'),
(55, N'Samsun'),
(56, N'Siirt'),
(57, N'Sinop'),
(58, N'Sivas'),
(59, N'Tekirdağ'),
(60, N'Tokat'),
(61, N'Trabzon'),
(62, N'Tunceli'),
(63, N'Şanlıurfa'),
(64, N'Uşak'),
(65, N'Van'),
(66, N'Yozgat'),
(67, N'Zonguldak'),
(68, N'Aksaray'),
(69, N'Bayburt'),
(70, N'Karaman'),
(71, N'Kırıkkale'),
(72, N'Batman'),
(73, N'Şırnak'),
(74, N'Bartın'),
(75, N'Ardahan'),
(76, N'Iğdır'),
(77, N'Yalova'),
(78, N'Karabük'),
(79, N'Kilis'),
(80, N'Osmaniye'),
(81, N'Düzce')


INSERT INTO tblUser VALUES('GOKHAN','SISMAN','PA1N','524431:37b5c94ba6d9d97622f5373e8e4360ae493887fce5ac1e3015382ea8cefadd0f:8f9f7f16eadc5bedab6baae9b511a7c8011751ea0e8ab49ab8284f308573c866','5376068195','ABOUTME-PA1N',28,'m','2012-02-21T18:10:00','https://i.hizliresim.com/bv9QYj.png','SOCIALMEDIADENEME','MAIL@GKHAN',0,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
						  ('FURKAN','BALTACI','FURKAN34','524431:37b5c94ba6d9d97622f5373e8e4360ae493887fce5ac1e3015382ea8cefadd0f:8f9f7f16eadc5bedab6baae9b511a7c8011751ea0e8ab49ab8284f308573c866','5458563458','ABOUTME-FURKAN',30,'f','2012-02-21T18:10:00','https://i.hizliresim.com/6DMY89.jpg','SOCIALMEDIADENEME','MAIL@GKHAN',0,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
						  ('MERT','NACAR','HiatusGG','524431:37b5c94ba6d9d97622f5373e8e4360ae493887fce5ac1e3015382ea8cefadd0f:8f9f7f16eadc5bedab6baae9b511a7c8011751ea0e8ab49ab8284f308573c866','5462318524','ABOUTME-HIATUS',77,'u','2012-02-21T18:10:00','https://i.hizliresim.com/NLGYWL.jpg','SOCIALMEDIADENEME','MAIL@GKHAN',0,0,'2012-02-21T18:10:00','2012-02-21T18:10:00')
				
INSERT INTO tblCompetition VALUES('Coca-Cola','Coca-Cola Açıklaması',3,3,0,'2012-02-21T18:10:00','2020-02-21T18:10:00','2012-02-21T18:10:00','2012-02-21T18:10:00',1),
								 ('AKSA','AKSA Açıklaması',3,3,0,'2012-02-21T18:10:00','2020-08-21T18:10:00','2012-02-21T18:10:00','2012-02-21T18:10:00',2),
								 ('ETİ','ETİ Açıklaması',3,3,1,'2012-02-21T18:10:00','2017-02-21T18:10:00','2012-02-21T18:10:00','2012-02-21T18:10:00',3)
				

INSERT INTO tblVideo VALUES('https://vmcdn.ciner.com.tr/ht/2019/03/26/25D442D3246BA901E1FED9DEE80E3B17-vi.mp4','Ilk futbol Videom','Futbol Videosu Deneme',100,70,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
						   ('https://vmcdn.ciner.com.tr/ht/2019/03/26/1553599906-vi.mp4','Deneme2','Futbol Videosu Deneme2',100,15,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
						   ('https://vmcdn.ciner.com.tr/ht/2019/03/26/1553599100-vi.mp4','Deneme Futbol2','Futbol Videosu Deneme3',100,20,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
						   ('https://vmcdn.ciner.com.tr/ht/2019/03/26/1553599221-vi.mp4','Yeteneðime göz at','Futbol Videosu Deneme4',100,30,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
						   ('https://vmcdn.ciner.com.tr/ht/2019/03/26/1553599664-vi.mp4','Buraya Gel','Futbol Videosu Deneme5',100,40,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
						   ('https://vmcdn.ciner.com.tr/ht/2019/03/26/9DBC16775E8163DB75A63C43EA73938A-vi.mp4','Haydi Gözat','Futbol Videosu Deneme6',100,50,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
						   ('https://vmcdn.ciner.com.tr/ht/2019/03/18/E1CD3B9AD2ADEB315C27E59BEFD9DB2E-vi.mp4','Hey buradayým','Futbol Videosu Deneme7',100,60,'2012-02-21T18:10:00','2012-02-21T18:10:00')


INSERT INTO tblComment  VALUES('Çok güzel bir video',5,'2012-02-21T18:10:00','2012-02-21T18:10:00',1,6),
							  ('Çok yeteneklisin',3,'2012-02-21T18:10:00','2012-02-21T18:10:00',2,2),
							  ('Jeneriklikkk !!!',2,'2012-02-21T18:10:00','2012-02-21T18:10:00',2,3)


INSERT INTO tblFollowers VALUES (1,2,1,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (1,3,1,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (2,3,1,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (3,1,0,1,'2012-02-21T18:10:00','2012-02-21T18:10:00')


INSERT INTO tblStarVideo VALUES(1,1,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (1,2,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (1,3,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (1,4,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (1,5,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (1,6,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (1,7,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (2,1,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (2,2,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (2,3,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (2,4,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (2,5,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (2,6,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (2,7,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (3,1,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (3,2,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (3,3,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (3,4,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (3,5,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (3,6,0,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
							   (3,7,1,'2012-02-21T18:10:00','2012-02-21T18:10:00')		
							 	
INSERT INTO tblUserCompetition VALUES(1,1,1,NULL,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
									 (1,2,NULL,1,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
									 (1,3,5,5,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
									 (2,1,NULL,NULL,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
									 (2,2,4,4,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
									 (2,3,NULL,4,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
									 (3,1,NULL,7,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
									 (3,2,3,NULL,'2012-02-21T18:10:00','2012-02-21T18:10:00'),
									 (3,3,7,7,'2012-02-21T18:10:00','2012-02-21T18:10:00')


