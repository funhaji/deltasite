-- Run this in Supabase SQL Editor. Tables use suffix _d9k2 to avoid conflicts with other projects.
-- Storage: use your existing "images" bucket.

-- Site config (single row): name, description, logo
CREATE TABLE IF NOT EXISTS site_config_d9k2 (
  id INT PRIMARY KEY DEFAULT 1,
  site_name TEXT NOT NULL DEFAULT 'گروه ساختمانی انبوه سازان دلتا',
  site_description TEXT NOT NULL DEFAULT 'گروه ساختمانی انبوه سازان دلتا - سازنده مدرن ترین و لوکس ترین ساختمان ها',
  logo_url TEXT,
  logo_letter TEXT NOT NULL DEFAULT 'د',
  CONSTRAINT single_row CHECK (id = 1)
);

-- Top bar
CREATE TABLE IF NOT EXISTS topbar_d9k2 (
  id INT PRIMARY KEY DEFAULT 1,
  company_name TEXT NOT NULL DEFAULT 'گروه ساختمانی انبوه سازان دلتا',
  hours TEXT NOT NULL DEFAULT 'شنبه - پنجشنبه: 7:00-18:00',
  phone TEXT NOT NULL DEFAULT '09125703247',
  email TEXT NOT NULL DEFAULT 'alibastegi1396@yahoo.com',
  CONSTRAINT single_row_topbar CHECK (id = 1)
);

-- Nav links
CREATE TABLE IF NOT EXISTS nav_links_d9k2 (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Hero slides
CREATE TABLE IF NOT EXISTS hero_slides_d9k2 (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  cta_text TEXT NOT NULL DEFAULT 'مشاهده خدمات',
  cta_link TEXT NOT NULL DEFAULT '#services',
  sort_order INT NOT NULL DEFAULT 0
);

-- About section (single row)
CREATE TABLE IF NOT EXISTS about_d9k2 (
  id INT PRIMARY KEY DEFAULT 1,
  tagline TEXT NOT NULL DEFAULT 'ما کی هستیم',
  heading TEXT NOT NULL DEFAULT 'داشتن بیش از دو دهه سابقه کار',
  body TEXT NOT NULL,
  ceo_name TEXT NOT NULL DEFAULT 'علی بستگی',
  ceo_title TEXT NOT NULL DEFAULT 'مدیر عامل و موسس',
  image_url TEXT,
  stat1_value TEXT NOT NULL DEFAULT '۲۰+',
  stat1_label TEXT NOT NULL DEFAULT 'سال تجربه',
  stat2_value TEXT NOT NULL DEFAULT '۱۵۰+',
  stat2_label TEXT NOT NULL DEFAULT 'پروژه موفق',
  stat3_value TEXT NOT NULL DEFAULT '۵۰+',
  stat3_label TEXT NOT NULL DEFAULT 'تیم مهندسی',
  CONSTRAINT single_row_about CHECK (id = 1)
);

-- Services
CREATE TABLE IF NOT EXISTS services_d9k2 (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'hammer',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- Process steps
CREATE TABLE IF NOT EXISTS process_steps_d9k2 (
  id SERIAL PRIMARY KEY,
  step_number TEXT NOT NULL DEFAULT '۱',
  icon TEXT NOT NULL DEFAULT 'message-circle',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery_d9k2 (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- CTA section (single row)
CREATE TABLE IF NOT EXISTS cta_d9k2 (
  id INT PRIMARY KEY DEFAULT 1,
  tagline TEXT NOT NULL DEFAULT 'همکاری با ما',
  heading TEXT NOT NULL DEFAULT 'جایی که رویاهای شما ساخته میشود',
  body TEXT NOT NULL,
  cta_text TEXT NOT NULL DEFAULT 'تماس با ما',
  cta_link TEXT NOT NULL DEFAULT '#contact',
  CONSTRAINT single_row_cta CHECK (id = 1)
);

-- Contact section (single row)
CREATE TABLE IF NOT EXISTS contact_d9k2 (
  id INT PRIMARY KEY DEFAULT 1,
  tagline TEXT NOT NULL DEFAULT 'ارتباط با ما',
  heading TEXT NOT NULL DEFAULT 'درخواست وقت',
  subtext TEXT NOT NULL,
  form_label_name TEXT NOT NULL DEFAULT 'نام شما *',
  form_placeholder_name TEXT NOT NULL DEFAULT 'نام خود را وارد کنید',
  form_label_email TEXT NOT NULL DEFAULT 'ایمیل شما *',
  form_placeholder_email TEXT NOT NULL DEFAULT 'email@example.com',
  form_label_message TEXT NOT NULL DEFAULT 'پیام شما',
  form_placeholder_message TEXT NOT NULL DEFAULT 'پیام خود را بنویسید...',
  submit_text TEXT NOT NULL DEFAULT 'ارسال پیام',
  submitted_text TEXT NOT NULL DEFAULT 'ارسال شد!',
  CONSTRAINT single_row_contact CHECK (id = 1)
);

-- Footer (single row)
CREATE TABLE IF NOT EXISTS footer_d9k2 (
  id INT PRIMARY KEY DEFAULT 1,
  brand_name TEXT NOT NULL DEFAULT 'گروه ساختمانی دلتا',
  logo_letter TEXT NOT NULL DEFAULT 'د',
  description TEXT NOT NULL,
  copyright_text TEXT NOT NULL DEFAULT 'تمامی حقوق برای گروه ساختمانی انبوه سازان دلتا محفوظ است.',
  address TEXT NOT NULL,
  hours TEXT NOT NULL DEFAULT 'شنبه - پنجشنبه: 7:00-18:00',
  phone TEXT NOT NULL DEFAULT '09125703247',
  email TEXT NOT NULL DEFAULT 'alibastegi1396@yahoo.com',
  gallery_heading TEXT NOT NULL DEFAULT 'گالری',
  quick_links_heading TEXT NOT NULL DEFAULT 'لینک های سریع',
  contact_heading TEXT NOT NULL DEFAULT 'اطلاعات تماس',
  CONSTRAINT single_row_footer CHECK (id = 1)
);

-- Footer quick links (same structure as nav)
CREATE TABLE IF NOT EXISTS footer_links_d9k2 (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Contact form submissions (درخواست وقت)
CREATE TABLE IF NOT EXISTS contact_messages_d9k2 (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS (optional; anon can read if we use service role from API)
ALTER TABLE site_config_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE topbar_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE cta_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_links_d9k2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages_d9k2 ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact messages (form submission)
CREATE POLICY "Allow public insert contact_messages_d9k2" ON contact_messages_d9k2 FOR INSERT WITH CHECK (true);
-- No public SELECT; only service role (admin API) can read

-- Public read policies (anon key can read)
CREATE POLICY "Allow public read site_config_d9k2" ON site_config_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read topbar_d9k2" ON topbar_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read nav_links_d9k2" ON nav_links_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read hero_slides_d9k2" ON hero_slides_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read about_d9k2" ON about_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read services_d9k2" ON services_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read process_steps_d9k2" ON process_steps_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery_d9k2" ON gallery_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read cta_d9k2" ON cta_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read contact_d9k2" ON contact_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read footer_d9k2" ON footer_d9k2 FOR SELECT USING (true);
CREATE POLICY "Allow public read footer_links_d9k2" ON footer_links_d9k2 FOR SELECT USING (true);

-- Service role will be used from API for write; no insert/update policy for anon.

-- Seed data
INSERT INTO site_config_d9k2 (id, site_name, site_description, logo_url, logo_letter) VALUES
(1, 'گروه ساختمانی انبوه سازان دلتا', 'گروه ساختمانی انبوه سازان دلتا - سازنده مدرن ترین و لوکس ترین ساختمان ها', NULL, 'د')
ON CONFLICT (id) DO NOTHING;

INSERT INTO topbar_d9k2 (id, company_name, hours, phone, email) VALUES
(1, 'گروه ساختمانی انبوه سازان دلتا', 'شنبه - پنجشنبه: 7:00-18:00', '09125703247', 'alibastegi1396@yahoo.com')
ON CONFLICT (id) DO NOTHING;

-- Run list seeds only once (no ON CONFLICT)
INSERT INTO nav_links_d9k2 (label, href, sort_order) VALUES
('خانه', '#', 0),
('درباره ما', '#about', 1),
('خدمات ما', '#services', 2),
('پروژه ها', '#projects', 3),
('تماس با ما', '#contact', 4);

INSERT INTO hero_slides_d9k2 (title, description, image_url, cta_text, cta_link, sort_order) VALUES
('افراد با استعداد و ابتکار عمل', 'به دنبال راه حل ساده برای ساخت و ساز میگردید! ما این راه حل را به شما ارائه میدهیم', '/images/hero-construction.jpg', 'مشاهده خدمات', '#services', 0),
('پایداری و ایجاد جمعی', 'پروژه های ما در خدمت منافع عمومی است و به دلیل اینکه اغلب در شهرها و مناطق تغییرات اساسی ایجاد می کنند', NULL, 'مشاهده خدمات', '#services', 1),
('ما هدف ها و پیش بینی های دقیقی داریم', 'ما همچنین زیرساخت های حیاتی و پروژه های نفت و گاز ، از جمله نیروگاه ها و پروژه های دریایی را پیش بینی کرده ایم', NULL, 'مشاهده خدمات', '#services', 2);

INSERT INTO about_d9k2 (id, tagline, heading, body, ceo_name, ceo_title, image_url, stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label) VALUES
(1, 'ما کی هستیم', 'داشتن بیش از دو دهه سابقه کار',
'گروه ساختمانی انبوه سازان دلتا با سابقه کار بیش از دو دهه و متشکل از بهترین تیم مهندسی سازنده مدرن ترین و لوکس ترین ساختمان ها در سطح کشور هستیم. گروه ساختمانی انبوه سازان دلتا زیبا ترین و خوش نقش ترین سازه ها را می سازد برای شما با بهترین مصالح و بالا ترین کیفیت، قیمت های مناسب، ساخت در کم ترین زمان ممکن.',
'علی بستگی', 'مدیر عامل و موسس', '/images/about-building.jpg',
'۲۰+', 'سال تجربه', '۱۵۰+', 'پروژه موفق', '۵۰+', 'تیم مهندسی')
ON CONFLICT (id) DO NOTHING;

INSERT INTO services_d9k2 (icon, title, description, image_url, sort_order) VALUES
('hammer', 'بهترین تعمیر و نوسازی', 'خانه های قدیمی شما را می کوبیم و از نو می سازیم با استفاده از مصالح با کیفیت و بنا به درخواست شما', '/images/service-renovation.jpg', 0),
('users', 'تیم کارگران حرفه ای', 'به تیم ما برای دقت و تمیزکاری اعتماد داشته باشید در کم ترین زمان ممکن خانه را برای شما آماده می کنیم', '/images/service-workers.jpg', 1),
('ruler', 'طراحی و معماری زیبا', 'تیم مهندسین طراح ما بی وقفه جهت طراحی یک نقشه زیبا چندین جلسه وقت خود را صرف ایده و نظرات خود می کنند', '/images/service-architecture.jpg', 2);

INSERT INTO process_steps_d9k2 (step_number, icon, title, description, sort_order) VALUES
('۱', 'message-circle', 'درخواست مشتری', 'شما درخواست خود را ثبت می کنید و ما آن را بررسی خواهیم کرد', 0),
('۲', 'lightbulb', 'مشاوره', 'تیم کارشناسان ما مشاوره رایگان و تخصصی ارائه خواهند داد', 1),
('۳', 'rocket', 'شروع پروژه', 'پس از توافق نهایی، پروژه شما با بهترین کیفیت آغاز می شود', 2);

INSERT INTO gallery_d9k2 (image_url, alt, sort_order) VALUES
('/images/gallery-1.jpg', 'پروژه آپارتمانی', 0),
('/images/gallery-2.jpg', 'طراحی داخلی لوکس', 1),
('/images/gallery-3.jpg', 'ساختمان تجاری مدرن', 2),
('/images/gallery-4.jpg', 'فعالیت ساخت و ساز', 3),
('/images/gallery-5.jpg', 'پروژه ویلایی', 4),
('/images/gallery-6.jpg', 'نقشه معماری', 5);

INSERT INTO cta_d9k2 (id, tagline, heading, body, cta_text, cta_link) VALUES
(1, 'همکاری با ما', 'جایی که رویاهای شما ساخته میشود',
'اگر شما این تجربه را تجربه کرده اید ، ما فرصت های خوبی برای توسعه و پیشرفت حرفه شما داشته ایم.',
'تماس با ما', '#contact')
ON CONFLICT (id) DO NOTHING;

INSERT INTO contact_d9k2 (id, tagline, heading, subtext, form_label_name, form_placeholder_name, form_label_email, form_placeholder_email, form_label_message, form_placeholder_message, submit_text, submitted_text) VALUES
(1, 'ارتباط با ما', 'درخواست وقت', 'جهت ارتباط و یاری در رساندن خدمات بهتر به شما از طریق فرم زیر با ما تماس بگیرید',
'نام شما *', 'نام خود را وارد کنید', 'ایمیل شما *', 'email@example.com', 'پیام شما', 'پیام خود را بنویسید...', 'ارسال پیام', 'ارسال شد!')
ON CONFLICT (id) DO NOTHING;

INSERT INTO footer_d9k2 (id, brand_name, logo_letter, description, copyright_text, address, hours, phone, email, gallery_heading, quick_links_heading, contact_heading) VALUES
(1, 'گروه ساختمانی دلتا', 'د', 'گروه ما با داشتن بیش از دو دهه سابقه کار تمام رویا های شما را برآورده می کنیم',
'تمامی حقوق برای گروه ساختمانی انبوه سازان دلتا محفوظ است.',
'تهران میدان شیخ بهایی ضلع غربی میدان ساختمان رایان ونک طبقه سوم',
'شنبه - پنجشنبه: 7:00-18:00', '09125703247', 'alibastegi1396@yahoo.com', 'گالری', 'لینک های سریع', 'اطلاعات تماس')
ON CONFLICT (id) DO NOTHING;

INSERT INTO footer_links_d9k2 (label, href, sort_order) VALUES
('خانه', '#', 0),
('درباره ما', '#about', 1),
('خدمات ما', '#services', 2),
('تماس با ما', '#contact', 3);
