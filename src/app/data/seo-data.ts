// SEO Competitive Analysis Sample Data
// Timeframe: Jul 2025 → Feb 2026

export const MONTHS = ['2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02'];
export const MONTH_LABELS = ['Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026'];

export const COMPETITORS = [
  { id: 'fortinet', name: 'Fortinet', color: '#EF4444' },
  { id: 'cisco', name: 'Cisco', color: '#FF7AB6' },
  { id: 'hpe', name: 'HPE', color: '#7ED957' },
  { id: 'paloalto', name: 'Palo Alto', color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point', color: '#6C9AFF' },
  { id: 'crowdstrike', name: 'Crowdstrike', color: '#1F2937' },
  { id: 'catonetworks', name: 'Cato Networks', color: '#8B5CF6' },
  { id: 'sentinelone', name: 'SentinelOne', color: '#EC4899' },
];

// Organic Traffic (in thousands)
export const ORGANIC_TRAFFIC = {
  fortinet: [890185, 987459, 848534, 861429, 1014918, 1216565, 1238062, 1220873],
  cisco: [1851119, 1926033, 1796711, 1597868, 2013042, 2062966, 1793605, 1824021],
  hpe: [365056, 413677, 371077, 347469, 363898, 418122, 357392, 325543],
  paloalto: [295767, 412493, 546710, 824929, 588517, 573648, 549652, 635255],
  checkpoint: [179617, 193486, 242600, 316209, 173380, 148047, 136099, 123392],
  crowdstrike: [351558, 1027015, 292017, 277997, 494958, 326721, 304393, 445930],
  catonetworks: [16993, 20452, 19024, 19607, 18712, 18833, 19371, 20085],
  sentinelone: [147647, 156874, 161404, 193143, 314785, 176178, 205344, 278278],
};

// Branded Traffic (in thousands)
export const BRANDED_TRAFFIC = {
  fortinet: [158453, 121457, 161221, 161949, 114686, 93676, 118854, 92786],
  cisco: [973689, 986129, 977411, 859653, 897817, 808683, 733584, 729608],
  hpe: [132150, 134445, 139896, 141420, 133187, 140489, 119012, 98965],
  paloalto: [70688, 129110, 231805, 164161, 112407, 153738, 124221, 130863],
  checkpoint: [51550, 59787, 51674, 50277, 53228, 51816, 48179, 29737],
  crowdstrike: [180701, 785666, 87605, 86457, 105426, 65344, 52356, 101672],
  catonetworks: [6831, 7383, 7686, 7804, 7466, 6629, 7361, 7371],
  sentinelone: [60978, 60240, 60204, 56784, 57291, 55320, 60371, 60386],
};

// Non-Branded Traffic (in thousands)
export const NON_BRANDED_TRAFFIC = {
  fortinet: [731732, 866002, 687313, 699480, 900232, 1122889, 1119208, 1128087],
  cisco: [877430, 939904, 819300, 738215, 1115225, 1254283, 1060021, 1094413],
  hpe: [232906, 279232, 231181, 206049, 230711, 277633, 238380, 226578],
  paloalto: [225079, 283383, 314905, 660768, 476110, 419910, 425431, 504392],
  checkpoint: [128067, 133699, 190926, 265932, 120152, 96231, 87920, 93655],
  crowdstrike: [170857, 241349, 204412, 191540, 389532, 261377, 252037, 344258],
  catonetworks: [10162, 13069, 11338, 11803, 11246, 12204, 12010, 12714],
  sentinelone: [86669, 96634, 101200, 136359, 257494, 120858, 144973, 217892],
};

// Organic Keywords Overall (in thousands)
export const ORGANIC_KEYWORDS = {
  fortinet:     [309000,  284000,  297000,  296000,  296000,  300000,  337000,  362000],
  cisco:        [833000,  743000,  760000,  744000,  724000,  724000,  734000,  793000],
  hpe:          [200000,  189000,  200000,  197000,  202000,  225000,  231000,  262000],
  paloalto:     [165000,  160000,  165000,  166000,  156000,  183000,  189000,  224000],
  checkpoint:   [117000,  105000,  110000,  108000,  106000,  108000,  124000,  129000],
  crowdstrike:  [104000,   99000,  106000,  103000,   96000,   93000,   90000,  139000],
  catonetworks: [ 14951,   13416,   13552,   12261,   12261,   16067,   17902,   17902],
  sentinelone:  [ 63123,   72369,   78807,   79425,   79013,   79037,   89337,   98450],
};

// Keywords Ranking on Page 1 (in thousands)
export const PAGE_ONE_KEYWORDS = {
  fortinet:     [39000, 40000, 42000, 42000, 41000, 42000, 45000, 47000],
  cisco:        [87000, 87000, 91000, 90000, 86000, 83000, 89000, 93000],
  hpe:          [23000, 24000, 25000, 25000, 25000, 25000, 26000, 26000],
  paloalto:     [19000, 18000, 20000, 20000, 20000, 20000, 21000, 22000],
  checkpoint:   [ 9000,  9000,  9000,  9000,  9000,  8000,  8000,  8000],
  crowdstrike:  [16000, 16000, 17000, 17000, 16000, 15000, 15000, 17000],
  catonetworks: [ 1270,  1189,  1238,  1236,  1225,  1341,  1660,  1661],
  sentinelone:  [ 9803,  9156,  9976,  9994, 10009, 10513, 12708, 14081],
};

// Mock Domain Authority & Referring Domains
export const DOMAIN_AUTHORITY = {
  fortinet: [85, 85, 85, 86, 86, 87, 87, 87],
  cisco: [92, 92, 92, 92, 93, 93, 93, 93],
  hpe: [88, 88, 88, 88, 89, 89, 89, 89],
  paloalto: [82, 82, 82, 83, 83, 84, 84, 84],
  checkpoint: [79, 79, 79, 79, 80, 80, 81, 81],
  crowdstrike: [86, 86, 86, 87, 87, 88, 88, 88],
  catonetworks: [72, 72, 72, 73, 73, 74, 74, 74],
  sentinelone: [78, 78, 78, 79, 80, 80, 81, 81],
};

export const REFERRING_DOMAINS = {
  fortinet: [43800, 44500, 45000, 46200, 47100, 48300, 49200, 50100],
  cisco: [126000, 127200, 128000, 129500, 131000, 132800, 134200, 135600],
  hpe: [96500, 97200, 98000, 99100, 100200, 101500, 102800, 104100],
  paloalto: [36800, 37400, 38000, 39200, 40100, 41000, 42100, 43200],
  checkpoint: [31200, 31600, 32000, 32800, 33600, 34200, 35000, 35800],
  crowdstrike: [50000, 51000, 52000, 54100, 56300, 58200, 60100, 62000],
  catonetworks: [8100, 8300, 8500, 8700, 8900, 9100, 9300, 9500],
  sentinelone: [26500, 27200, 28000, 29200, 30500, 31800, 33100, 34400],
};

// Mock Top 20 Keywords
export const TOP_KEYWORDS = [
  { keyword: 'cybersecurity solutions', position: 2, trafficShare: 12.5, aiPresence: 'High', competitor: 'cisco' },
  { keyword: 'network firewall', position: 1, trafficShare: 18.3, aiPresence: 'Medium', competitor: 'fortinet' },
  { keyword: 'endpoint security', position: 3, trafficShare: 9.7, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'cloud security platform', position: 4, trafficShare: 15.2, aiPresence: 'Medium', competitor: 'paloalto' },
  { keyword: 'enterprise networking', position: 1, trafficShare: 22.1, aiPresence: 'Low', competitor: 'cisco' },
  { keyword: 'threat intelligence', position: 5, trafficShare: 8.4, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'zero trust security', position: 2, trafficShare: 11.9, aiPresence: 'High', competitor: 'paloalto' },
  { keyword: 'vpn gateway', position: 3, trafficShare: 10.2, aiPresence: 'Low', competitor: 'checkpoint' },
  { keyword: 'edge computing', position: 6, trafficShare: 7.8, aiPresence: 'Medium', competitor: 'hpe' },
  { keyword: 'network monitoring', position: 2, trafficShare: 13.6, aiPresence: 'Medium', competitor: 'cisco' },
  { keyword: 'malware protection', position: 4, trafficShare: 9.1, aiPresence: 'High', competitor: 'fortinet' },
  { keyword: 'siem solutions', position: 7, trafficShare: 6.3, aiPresence: 'Medium', competitor: 'crowdstrike' },
  { keyword: 'firewall software', position: 1, trafficShare: 16.7, aiPresence: 'Low', competitor: 'fortinet' },
  { keyword: 'hybrid cloud security', position: 5, trafficShare: 8.9, aiPresence: 'High', competitor: 'hpe' },
  { keyword: 'intrusion prevention', position: 3, trafficShare: 10.8, aiPresence: 'Medium', competitor: 'checkpoint' },
  { keyword: 'data center solutions', position: 4, trafficShare: 9.5, aiPresence: 'Low', competitor: 'hpe' },
  { keyword: 'next-gen firewall', position: 2, trafficShare: 14.2, aiPresence: 'Medium', competitor: 'paloalto' },
  { keyword: 'threat detection', position: 6, trafficShare: 7.1, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'security analytics', position: 8, trafficShare: 5.9, aiPresence: 'High', competitor: 'cisco' },
  { keyword: 'network security', position: 1, trafficShare: 19.4, aiPresence: 'Medium', competitor: 'fortinet' },
];

// Quick Wins & Content Gap Insights
export const QUICK_WINS = [
  {
    title: 'Cisco: Major Organic Spike Investigation',
    description: 'Cisco shows massive traffic spike Oct-Nov (19.7M → 33.5M). Investigate content strategy, possible cannibalization, or data anomalies.',
    priority: 'high',
    impact: 'High',
  },
  {
    title: 'HPE: Consistent Performance',
    description: 'HPE maintains steady organic traffic (1.6-1.9M). Opportunity to amplify winning content and expand keyword coverage.',
    priority: 'medium',
    impact: 'Medium',
  },
  {
    title: 'Crowdstrike: Volatile Traffic Pattern',
    description: 'Crowdstrike shows inconsistent traffic (946k → 569k). Analyze seasonal trends and content freshness for stabilization.',
    priority: 'medium',
    impact: 'Medium',
  },
];

// LLM/AI Visibility Mock Data
export const AI_METRICS = {
  aiReadinessScore: 73,
  aiTriggeringQueries: 284,
  llmCitations: 156,
  topAIKeywords: ['cybersecurity solutions', 'zero trust security', 'threat intelligence', 'endpoint security'],
};

// Anomalies & Callouts
export const ANOMALIES = [
  { type: 'warning', message: 'Cisco: major organic spike Oct–Nov (19.7M → 33.5M)', competitor: 'cisco' },
  { type: 'alert', message: 'Cisco Non-Branded: large volume — confirm data source', competitor: 'cisco' },
  { type: 'info', message: 'Data note: null = no data reported for month', competitor: null },
  { type: 'warning', message: 'Multiple competitors missing Jan 2026 branded data', competitor: null },
];