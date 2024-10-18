// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // English translations
            "Ayarlar": "Settings",
            "İsim": "Name",
            "Yaş": "Age",
            "Cinsiyet": "Gender",
            "Cinsiyet Seçin": "Select Gender",
            "Erkek": "Male",
            "Kadın": "Female",
            "Diğer": "Other",
            "İlişki Durumu": "Relationship Status",
            "İlişki Durumunuzu Seçin": "Select Your Relationship Status",
            "Bekar": "Single",
            "Evli": "Married",
            "Nişanlı": "Engaged",
            "Boşanmış": "Divorced",
            "Karmaşık": "It's Complicated",
            "İlgi Alanı": "Interest",
            "İlgi Alanınızı Seçin": "Select Your Interest",
            "Erkekler": "Men",
            "Kadınlar": "Women",
            "Dil / Language": "Language",
            "Dil Seçin / Select Language": "Select Language",
            "Profil Güncelle": "Update Profile",
            "Profil Güncellendi": "Profile Updated",
            "Profiliniz başarıyla güncellendi.": "Your profile has been successfully updated.",
            "Hata": "Error",
            "Profil güncellenirken bir hata oluştu.": "An error occurred while updating the profile.",
            "Çıkış Yap": "Log Out",
            "Hesabı Sil": "Delete Account",
            "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.": "Are you sure you want to delete your account? This action cannot be undone.",
            "İptal": "Cancel",
            "Sil": "Delete",
            "Hesap Silme Hatası": "Account Deletion Error",
            "Hesabınızı silerken bir hata oluştu. Lütfen tekrar deneyin.": "An error occurred while deleting your account. Please try again.",
            "Geçmiş Kahve Falları": "Past Coffee Fortunes",
            "Geçmiş Günlük Burçlar": "Past Daily Horoscopes",
            "Geçmiş Astroloji Haritası": "Past Astrology Charts",
            "Fal hakkınız kalmamıştır.": "You have no fortune credits left.",
            "Fal #": "Fortune #",
            "Kayıtlı falınız bulunmamaktadır. Hemen +'ya basınız ve falınızı baktırınız.": "You have no saved fortunes. Press the '+' to get your fortune.",
            "Fal Yorumunuz": "Your Fortune",
            "Ana Ekrana Dön": "Return to Main Screen",
            "Falınız kaydedildi!": "Your fortune has been saved!",
            "Paylaşma hatası": "Sharing Error",
            "Kayıt hatası": "Saving Error",
            "Lütfen tüm resimleri yükleyin.": "Please upload all images.",
            "Fal gönderilemedi. Lütfen tekrar deneyin.": "Fortune could not be sent. Please try again.",
            "Lütfen bekleyin, falınız hazırlanıyor...": "Please wait, your fortune is being prepared...",
            "Falı Görüntüle!": "View Your Fortune!",
            "Kahve falı baktır": "Get Coffee Fortune",
            "Çok Yakında": "Coming Soon",
            "Günlük Burçlar": "Daily Horoscopes",
            "Astroloji Haritası": "Astrology Chart",
            "Lütfen fincanınızı ve fincan tabağınızı hazır konuma getiriniz.": "Please prepare your coffee cup and saucer.",
            "Devam Et": "Continue",
            "Hoşgeldin": "Welcome",
            "Kahve Fincanı": "Coffee Cup",
            "Kahve fincanınızın fotoğraflarını yükleyiniz.": "Upload photos of your coffee cup.",
            "Kahve Tabağı": "Coffee Saucer",
            "Kahve tabağınızın fotoğrafını yükleyiniz.": "Upload a photo of your coffee saucer.",
            "Falcıya Gönder!": "Send to Fortune Teller!",
            "Kalan Fal Hakkınız": "Your Remaining Fortune Credits",
            "Sorunuz mu var?": "Do you have a question?",
            "Lütfen": "Please",
            "'a mail yazınız.": "send an email to"
        }
    },
    tr: {
        translation: {
            // Turkish words and phrases
            "Ayarlar": "Ayarlar",
            "İsim": "İsim",
            "Yaş": "Yaş",
            "Cinsiyet": "Cinsiyet",
            "Cinsiyet Seçin": "Cinsiyet Seçin",
            "Erkek": "Erkek",
            "Kadın": "Kadın",
            "Diğer": "Diğer",
            "İlişki Durumu": "İlişki Durumu",
            "İlişki Durumunuzu Seçin": "İlişki Durumunuzu Seçin",
            "Bekar": "Bekar",
            "Evli": "Evli",
            "Nişanlı": "Nişanlı",
            "Boşanmış": "Boşanmış",
            "Karmaşık": "Karmaşık",
            "İlgi Alanı": "İlgi Alanı",
            "İlgi Alanınızı Seçin": "İlgi Alanınızı Seçin",
            "Erkekler": "Erkekler",
            "Kadınlar": "Kadınlar",
            "Dil / Language": "Dil / Language",
            "Dil Seçin / Select Language": "Dil Seçin / Select Language",
            "Profil Güncelle": "Profil Güncelle",
            "Profil Güncellendi": "Profil Güncellendi",
            "Profiliniz başarıyla güncellendi.": "Profiliniz başarıyla güncellendi.",
            "Hata": "Hata",
            "Profil güncellenirken bir hata oluştu.": "Profil güncellenirken bir hata oluştu.",
            "Çıkış Yap": "Çıkış Yap",
            "Hesabı Sil": "Hesabı Sil",
            "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.": "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
            "İptal": "İptal",
            "Sil": "Sil",
            "Hesap Silme Hatası": "Hesap Silme Hatası",
            "Hesabınızı silerken bir hata oluştu. Lütfen tekrar deneyin.": "Hesabınızı silerken bir hata oluştu. Lütfen tekrar deneyin.",
            "Geçmiş Kahve Falları": "Geçmiş Kahve Falları",
            "Geçmiş Günlük Burçlar": "Geçmiş Günlük Burçlar",
            "Geçmiş Astroloji Haritası": "Geçmiş Astroloji Haritası",
            "Fal hakkınız kalmamıştır.": "Fal hakkınız kalmamıştır.",
            "Fal #": "Fal #",
            "Kayıtlı falınız bulunmamaktadır. Hemen +'ya basınız ve falınızı baktırınız.": "Kayıtlı falınız bulunmamaktadır. Hemen +'ya basınız ve falınızı baktırınız.",
            "Fal Yorumunuz": "Fal Yorumunuz",
            "Ana Ekrana Dön": "Ana Ekrana Dön",
            "Falınız kaydedildi!": "Falınız kaydedildi!",
            "Paylaşma hatası": "Paylaşma hatası",
            "Kayıt hatası": "Kayıt hatası",
            "Lütfen tüm resimleri yükleyin.": "Lütfen tüm resimleri yükleyin.",
            "Fal gönderilemedi. Lütfen tekrar deneyin.": "Fal gönderilemedi. Lütfen tekrar deneyin.",
            "Lütfen bekleyin, falınız hazırlanıyor...": "Lütfen bekleyin, falınız hazırlanıyor...",
            "Falı Görüntüle!": "Falı Görüntüle!",
            "Kahve falı baktır": "Kahve falı baktır",
            "Çok Yakında": "Çok Yakında",
            "Günlük Burçlar": "Günlük Burçlar",
            "Astroloji Haritası": "Astroloji Haritası",
            "Lütfen fincanınızı ve fincan tabağınızı hazır konuma getiriniz.": "Lütfen fincanınızı ve fincan tabağınızı hazır konuma getiriniz.",
            "Devam Et": "Devam Et"
        }
    }
};


i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: 'tr', // default language
        fallbackLng: 'tr',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
