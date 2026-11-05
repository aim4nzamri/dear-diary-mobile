import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  Platform,
} from 'react-native';

interface DiaryEntry {
  id: string;
  time: string;
  date: string;
  moodEmoji: string;
  moodName: string;
  title: string;
  rawText: string;
  poeticText: string;
  isAiPoetic: boolean;
}

const INITIAL_ENTRIES: DiaryEntry[] = [
  {
    id: '1',
    time: '7:45 AM',
    date: 'Hari ini',
    moodEmoji: '🌅',
    moodName: 'Syukur',
    title: 'Secawan Kopi & Cahaya Pagi',
    rawText: 'pg td bgn awal sikit pastu bancuh kopi duduk tepi balkoni rasa sejuk je angin lps hujan mlm td. rasa tenang sgt xtahu knp padahal byk keje hari ni.',
    poeticText: 'Kedinginan embun selepas hujan semalam masih bersisa di hujung dedaun. Bersama secawan kopi yang mengepulkan aroma hangat di tubir balkoni, ada ketenangan halus yang meresap ke dalam jiwa — sebuah jeda yang manis sebelum dunia kembali riuh.',
    isAiPoetic: true,
  },
  {
    id: '2',
    time: '11:20 PM',
    date: 'Semalam',
    moodEmoji: '🌧️',
    moodName: 'Gundah',
    title: 'Kekusutan Yang Mencari Ruang',
    rawText: 'arghh hari ni penat sgt kerja bertimbun boss call tiba2 pastu jem teruk plak otw balik tapi nasib baik singgah beli ais krim rasa lega sikit.',
    poeticText: 'Hari ini terasa begitu panjang, diapit antara timbunan tugas yang menuntut dan deruan kota yang tidak pernah lelap. Namun di hujung keletihan ini, seulas senyuman kecil tetap mekar — mengingatkanku bahawa di sebalik hari yang kelabu, hal-hal sederhana tetap mampu memulihkan hati.',
    isAiPoetic: true,
  },
];

const MOODS = [
  { emoji: '🌅', name: 'Syukur' },
  { emoji: '🌧️', name: 'Gundah' },
  { emoji: '🔥', name: 'Kusut' },
  { emoji: '✨', name: 'Teruja' },
  { emoji: '🌙', name: 'Tenang' },
];

export default function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>(INITIAL_ENTRIES);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [viewMode, setViewMode] = useState<'poetic' | 'raw'>('poetic');

  // Modal Tulis Baru
  const [isWriteModalVisible, setIsWriteModalVisible] = useState(false);
  const [newMood, setNewMood] = useState(MOODS[0]);
  const [newTitle, setNewTitle] = useState('');
  const [newRawText, setNewRawText] = useState('');
  const [transformedPoetic, setTransformedPoetic] = useState('');
  const [modalViewMode, setModalViewMode] = useState<'raw' | 'poetic'>('raw');
  const [isTransforming, setIsTransforming] = useState(false);

  // Fungsi simulasi transformasi AI
  const handleAiTransform = () => {
    if (!newRawText.trim()) return;
    setIsTransforming(true);

    setTimeout(() => {
      // Menjana versi puitis berasaskan luahan mentah
      const generatedPoem = `Di celah kata yang terluah secara bersahaja: "${newRawText.trim()}", tersimpan gema perasaan yang mendalam. Setiap hela nafas yang berat hari ini sedang dianyam menjadi kekuatan untuk hari esok yang lebih cerah.`;
      setTransformedPoetic(generatedPoem);
      setIsTransforming(false);
      setModalViewMode('poetic');
    }, 900);
  };

  const handleSaveEntry = () => {
    if (!newRawText.trim()) return;

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      time: 'Baru sebentar',
      date: 'Hari ini',
      moodEmoji: newMood.emoji,
      moodName: newMood.name,
      title: newTitle.trim() || 'Catatan Jiwa',
      rawText: newRawText.trim(),
      poeticText: transformedPoetic || newRawText.trim(),
      isAiPoetic: !!transformedPoetic,
    };

    setEntries([newEntry, ...entries]);
    setIsWriteModalVisible(false);
    setNewTitle('');
    setNewRawText('');
    setTransformedPoetic('');
    setModalViewMode('raw');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Ambient Glow Lingkaran Lembut di Latar Belakang */}
      <View style={styles.ambientGlow} pointerEvents="none" />

      {/* HEADER UTAMA (Apple HIG Large Title Pattern) */}
      <View style={styles.header}>
        <Text style={styles.dateLabel}>KHAMIS, 5 NOVEMBER</Text>
        <Text style={styles.mainTitle}>Dear Diary</Text>
        <Text style={styles.subtitle}>
          Tempat selamat untuk meluah rasa & menyusun makna.
        </Text>
      </View>

      {/* SENARAI KAD DIARI (The Sanctuary Timeline) */}
      <ScrollView
        contentContainerStyle={styles.timelineContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Helaian Terkini</Text>
          <Text style={styles.entryCount}>{entries.length} catatan</Text>
        </View>

        {entries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={styles.card}
            activeOpacity={0.88}
            onPress={() => {
              setSelectedEntry(entry);
              setViewMode('poetic');
            }}
          >
            {/* Bahagian Atas Kad: Mood & Masa */}
            <View style={styles.cardHeader}>
              <View style={styles.moodPill}>
                <Text style={styles.moodEmoji}>{entry.moodEmoji}</Text>
                <Text style={styles.moodName}>{entry.moodName}</Text>
              </View>
              <Text style={styles.timeLabel}>
                {entry.date} · {entry.time}
              </Text>
            </View>

            {/* Tajuk Kad */}
            <Text style={styles.cardTitle}>{entry.title}</Text>

            {/* Petikan Kandungan Puitis */}
            <Text style={styles.cardSnippet} numberOfLines={3}>
              {entry.poeticText}
            </Text>

            {/* Footer Kad: AI Badge & Petunjuk Selak */}
            <View style={styles.cardFooter}>
              {entry.isAiPoetic && (
                <View style={styles.aiBadge}>
                  <Text style={styles.aiBadgeText}>✨ Sentuhan Puitis AI</Text>
                </View>
              )}
              <Text style={styles.readMoreText}>Baca & Bandingkan →</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BAR TINDAKAN TERAPUNG (Floating Vellum Glass Bar) */}
      <View style={styles.floatingActionBarContainer}>
        <View style={styles.floatingActionBar}>
          <TouchableOpacity
            style={styles.primaryActionButton}
            activeOpacity={0.85}
            onPress={() => setIsWriteModalVisible(true)}
          >
            <Text style={styles.primaryActionIcon}>✍️</Text>
            <Text style={styles.primaryActionText}>Tulis Luahan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryVoiceButton}
            activeOpacity={0.85}
            onPress={() => {
              // Contoh placeholder untuk voice-to-text
              setIsWriteModalVisible(true);
              setNewRawText('hari ni saya rasa seronok sgt dpt luah guna suara...');
            }}
          >
            <Text style={styles.voiceIcon}>🎙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL TULIS LUAHAN BARU (Raw Canvas & Poetic Alchemy) */}
      <Modal
        visible={isWriteModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsWriteModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsWriteModalVisible(false)}>
              <Text style={styles.modalCancelText}>Batal</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Helaian Baru</Text>
            <TouchableOpacity onPress={handleSaveEntry}>
              <Text style={styles.modalSaveText}>Simpan</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Mood Selector */}
            <Text style={styles.inputLabel}>Bagaimana rasa hati anda sekarang?</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.moodSelectorScroll}
            >
              {MOODS.map((m) => {
                const isSelected = newMood.name === m.name;
                return (
                  <TouchableOpacity
                    key={m.name}
                    style={[
                      styles.moodOptionPill,
                      isSelected && styles.moodOptionPillSelected,
                    ]}
                    onPress={() => setNewMood(m)}
                  >
                    <Text style={styles.moodOptionEmoji}>{m.emoji}</Text>
                    <Text
                      style={[
                        styles.moodOptionName,
                        isSelected && styles.moodOptionNameSelected,
                      ]}
                    >
                      {m.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Input Tajuk */}
            <TextInput
              style={styles.titleInput}
              placeholder="Tajuk (pilihan)"
              placeholderTextColor="#A89E95"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            {/* Togol Paparan Semasa Menulis (Jika dah ditransformasikan) */}
            {transformedPoetic ? (
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    modalViewMode === 'raw' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setModalViewMode('raw')}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      modalViewMode === 'raw' && styles.toggleTextActive,
                    ]}
                  >
                    ✍️ Versi Mentah (Raw)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    modalViewMode === 'poetic' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setModalViewMode('poetic')}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      modalViewMode === 'poetic' && styles.toggleTextActive,
                    ]}
                  >
                    ✨ Versi Puitis (AI)
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {/* Kanvas Menulis / Hasil */}
            {modalViewMode === 'raw' ? (
              <View style={styles.rawInputBox}>
                <TextInput
                  style={styles.rawTextInput}
                  placeholder="Luahkan apa sahaja secara bebas... Tiada format, bahasa rojak, atau tatabahasa yang salah di sini. Ruang ini selamat untuk anda."
                  placeholderTextColor="#A89E95"
                  multiline
                  textAlignVertical="top"
                  value={newRawText}
                  onChangeText={setNewRawText}
                />
              </View>
            ) : (
              <View style={styles.poeticBox}>
                <Text style={styles.poeticDropCap}>
                  {transformedPoetic.charAt(0)}
                </Text>
                <Text style={styles.poeticBodyText}>
                  {transformedPoetic.slice(1)}
                </Text>
              </View>
            )}

            {/* Butang Contoh & Butang Transform AI */}
            <View style={styles.alchemyActionGroup}>
              {!newRawText && (
                <TouchableOpacity
                  style={styles.samplePromptButton}
                  onPress={() =>
                    setNewRawText(
                      'hari ni penat gila keje bnyk tapi happy sbb dpt mkn kek coklat sedap giler petang tadi haha'
                    )
                  }
                >
                  <Text style={styles.samplePromptText}>
                    💡 Cuba masukkan contoh teks raw berselerak
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.aiTransformButton,
                  !newRawText.trim() && styles.aiTransformButtonDisabled,
                ]}
                disabled={!newRawText.trim() || isTransforming}
                onPress={handleAiTransform}
              >
                <Text style={styles.aiTransformButtonText}>
                  {isTransforming
                    ? '✨ Sedang Menganyam Kata...'
                    : '✨ Sulap Menjadi Puisi (AI Alchemy)'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* MODAL LIHAT & BANDINGKAN (Single Entry Comparator) */}
      {selectedEntry && (
        <Modal
          visible={!!selectedEntry}
          animationType="fade"
          presentationStyle="overFullScreen"
          transparent
          onRequestClose={() => setSelectedEntry(null)}
        >
          <View style={styles.detailBackdrop}>
            <View style={styles.detailCardContainer}>
              <View style={styles.detailHeader}>
                <View style={styles.detailMoodPill}>
                  <Text style={{ fontSize: 18 }}>{selectedEntry.moodEmoji}</Text>
                  <Text style={styles.detailMoodText}>
                    {selectedEntry.moodName}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedEntry(null)}
                  style={styles.detailCloseButton}
                >
                  <Text style={styles.detailCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.detailTitle}>{selectedEntry.title}</Text>
              <Text style={styles.detailTime}>
                {selectedEntry.date} · {selectedEntry.time}
              </Text>

              {/* Togol Versi Raw vs Puitis */}
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    viewMode === 'poetic' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setViewMode('poetic')}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      viewMode === 'poetic' && styles.toggleTextActive,
                    ]}
                  >
                    ✨ Versi Puitis
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    viewMode === 'raw' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setViewMode('raw')}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      viewMode === 'raw' && styles.toggleTextActive,
                    ]}
                  >
                    ✍️ Versi Mentah (Asal)
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.detailContentScroll}
                showsVerticalScrollIndicator={false}
              >
                {viewMode === 'poetic' ? (
                  <View style={styles.detailPoeticView}>
                    <Text style={styles.detailPoeticText}>
                      {selectedEntry.poeticText}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.detailRawView}>
                    <Text style={styles.detailRawText}>
                      {selectedEntry.rawText}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  ambientGlow: {
    position: 'absolute',
    top: -50,
    left: '20%',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FDE68A',
    opacity: 0.25,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'android' ? 24 : 10,
    paddingBottom: 16,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9C8E82',
    letterSpacing: 1.4,
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2A221E',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6D6259',
    marginTop: 4,
    lineHeight: 21,
  },
  timelineContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2A221E',
  },
  entryCount: {
    fontSize: 13,
    color: '#8C7E72',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0ECE4',
    shadowColor: '#2A221E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F3ED',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  moodEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  moodName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5C4F44',
  },
  timeLabel: {
    fontSize: 12,
    color: '#9E9287',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2A221E',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  cardSnippet: {
    fontSize: 15,
    color: '#574D45',
    lineHeight: 23,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F7F4EE',
  },
  aiBadge: {
    backgroundColor: '#FAF5EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EFE7DA',
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8F6626',
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7C5E43',
  },
  floatingActionBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  floatingActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F2',
    padding: 6,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#EBE4D8',
    shadowColor: '#1A1410',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A221E',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 30,
  },
  primaryActionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryVoiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#EFEAE2',
  },
  voiceIcon: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE9DF',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#8A7D72',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2A221E',
  },
  modalSaveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7C5E43',
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5C5046',
    marginBottom: 10,
  },
  moodSelectorScroll: {
    marginBottom: 18,
  },
  moodOptionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EFE8DE',
  },
  moodOptionPillSelected: {
    backgroundColor: '#2A221E',
    borderColor: '#2A221E',
  },
  moodOptionEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  moodOptionName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A3F36',
  },
  moodOptionNameSelected: {
    color: '#FFFFFF',
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#2A221E',
    borderWidth: 1,
    borderColor: '#EFE8DE',
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#EFE8DE',
    borderRadius: 14,
    padding: 4,
    marginBottom: 14,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8A7D72',
  },
  toggleTextActive: {
    color: '#2A221E',
  },
  rawInputBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    minHeight: 180,
    borderWidth: 1,
    borderColor: '#EFE8DE',
  },
  rawTextInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2A221E',
  },
  poeticBox: {
    backgroundColor: '#FFFDF9',
    borderRadius: 18,
    padding: 20,
    minHeight: 180,
    borderWidth: 1,
    borderColor: '#EFE2CE',
  },
  poeticDropCap: {
    fontSize: 32,
    fontWeight: '800',
    color: '#7C5E43',
    lineHeight: 36,
  },
  poeticBodyText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#3D332B',
    fontStyle: 'italic',
  },
  alchemyActionGroup: {
    marginTop: 18,
  },
  samplePromptButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  samplePromptText: {
    fontSize: 13,
    color: '#7C5E43',
    textDecorationLine: 'underline',
  },
  aiTransformButton: {
    backgroundColor: '#7C5E43',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#7C5E43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  aiTransformButtonDisabled: {
    backgroundColor: '#C5B9AC',
    shadowOpacity: 0,
  },
  aiTransformButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  detailBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  detailCardContainer: {
    backgroundColor: '#FAF7F2',
    borderRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailMoodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFE7DA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  detailMoodText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5C4E42',
    marginLeft: 6,
  },
  detailCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFE7DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailCloseText: {
    fontSize: 14,
    color: '#5C4E42',
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2A221E',
    marginBottom: 4,
  },
  detailTime: {
    fontSize: 12,
    color: '#9C8E82',
    marginBottom: 14,
  },
  detailContentScroll: {
    maxHeight: 280,
    marginTop: 4,
  },
  detailPoeticView: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE7DA',
  },
  detailPoeticText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#332A24',
    fontStyle: 'italic',
  },
  detailRawView: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE7DA',
  },
  detailRawText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#5A4E45',
  },
});
