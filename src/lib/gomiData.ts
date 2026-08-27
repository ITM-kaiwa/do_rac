import type {
  GomiCategory,
  GomiItem,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
} from "./types";

/**
 * Content curated from the source lesson materials:
 *   実践授業--ゴミの分別.pptx (rules, categories, quiz slides)
 *   実践授業--ゴミの分別--ゴミ分別カード.pptx (58 item picture cards)
 * for Vietnamese technical interns moving to Japan. The lesson itself notes
 * (slide 2) that exact bin names and rules vary by municipality -- the data
 * below reflects the commonly-taught defaults, shown to learners as a
 * starting point rather than a legal reference for any specific city.
 */

export const GOMI_CATEGORIES: GomiCategory[] = [
  {
    id: "moeru",
    emoji: "🔥",
    nameJa: "もえるゴミ",
    nameVi: "Rác cháy được (rác dễ cháy)",
    descriptionVi:
      "Rác thức ăn thừa, quần áo và giày dép cũ, hoa tươi đã héo, thú nhồi bông, tã giấy đã dùng, dây/thừng. Đốt được nên thu gom bằng túi đốt được theo quy định của địa phương.",
    color: "red",
  },
  {
    id: "moenai",
    emoji: "🪨",
    nameJa: "もえないゴミ",
    nameVi: "Rác không cháy được",
    descriptionVi:
      "Đồ sứ/gốm/thủy tinh bị vỡ, bóng đèn, đồ dùng nhỏ bằng kim loại/nhựa tổng hợp. Dao, kéo phải gói riêng bằng giấy báo và ghi rõ \"nguy hiểm\" (kiken) bên ngoài trước khi vứt.",
    color: "slate",
  },
  {
    id: "shigen",
    emoji: "♻️",
    nameJa: "しげんゴミ",
    nameVi: "Rác tài nguyên / tái chế",
    descriptionVi:
      "Lon, chai thủy tinh, báo cũ, tạp chí, thùng các tông, hộp sữa, đồ kim loại (nồi, chảo). Phải rửa sạch trước khi vứt -- nếu vết bẩn không rửa được thì bỏ vào rác cháy được thay vì rác tài nguyên.",
    color: "emerald",
  },
  {
    id: "plastic",
    emoji: "🧴",
    nameJa: "プラスチックゴミ",
    nameVi: "Rác nhựa",
    descriptionVi:
      "Bao bì nhựa có in dấu \"プラ\". Đồ vật mỏng hơn thẻ ngân hàng (dưới khoảng 0.76mm) thường được xếp vào rác cháy được; dày hơn thì xếp vào rác không cháy được. Rửa sạch trước khi vứt.",
    color: "sky",
  },
  {
    id: "pet",
    emoji: "🍾",
    nameJa: "ペットボトル",
    nameVi: "Chai nhựa PET",
    descriptionVi:
      "Chai nước, chai trà, chai nước tương... Tháo nắp và nhãn (thường xếp vào rác nhựa riêng), rửa sạch bên trong rồi mới vứt vào ngày thu gom chai PET.",
    color: "cyan",
  },
  {
    id: "sodai",
    emoji: "🛋️",
    nameJa: "そだいゴミ",
    nameVi: "Rác cồng kềnh (đồ lớn)",
    descriptionVi:
      "Bàn ghế gỗ, giường, nệm, tủ quần áo, thảm, chiếu tatami -- những thứ không vừa túi rác 20 lít. Phải mua phiếu thu gom rác cồng kềnh (bán ở cửa hàng tiện lợi/siêu thị) và đặt lịch trước.",
    color: "amber",
  },
  {
    id: "kaden",
    emoji: "📺",
    nameJa: "おおがたかでん",
    nameVi: "Đồ điện gia dụng cỡ lớn",
    descriptionVi:
      "Tủ lạnh, máy giặt, điều hòa, tivi -- thuộc \"luật tái chế đồ điện gia dụng\". KHÔNG được vứt như rác cồng kềnh thông thường; phải liên hệ cửa hàng bán hoặc đơn vị thu gom chỉ định của địa phương (có phí).",
    color: "indigo",
  },
  {
    id: "kiken",
    emoji: "⚠️",
    nameJa: "きけん・ゆうがいゴミ",
    nameVi: "Rác nguy hiểm / độc hại",
    descriptionVi:
      "Pin khô, bình xịt, đèn huỳnh quang, nhiệt kế, bật lửa. Bình xịt phải xì hết ga (đâm thủng, làm xẹp) trước khi vứt vì có thể phát nổ. Thu gom riêng theo lịch của địa phương.",
    color: "rose",
  },
  {
    id: "special",
    emoji: "💻",
    nameJa: "とくべつかいしゅう",
    nameVi: "Thu gom đặc biệt (máy tính, điện thoại)",
    descriptionVi:
      "Máy tính, laptop, điện thoại cũ chứa nhiều thông tin cá nhân nên KHÔNG được vứt như rác thường. Hãy liên hệ nhà sản xuất để họ thu lại, hoặc mang đến bưu điện/tòa thị chính.",
    color: "purple",
  },
];

export function getGomiCategory(id: string): GomiCategory | undefined {
  return GOMI_CATEGORIES.find((c) => c.id === id);
}

export const GOMI_ITEMS: GomiItem[] = [
  // もえるゴミ
  { id: "food_waste", emoji: "🍚", nameJa: "なまゴミ", nameVi: "Rác thức ăn thừa", categoryId: "moeru", note: "Nên để ráo nước trước khi cho vào túi." },
  { id: "clothes", emoji: "👕", nameJa: "ふるぎ", nameVi: "Quần áo cũ", categoryId: "moeru", note: "Quần áo và giày dép được xếp vào rác cháy được." },
  { id: "shoes", emoji: "👟", nameJa: "くつ（うんどうぐつ）", nameVi: "Giày thể thao", categoryId: "moeru", note: "Cùng nhóm với quần áo cũ -- rác cháy được." },
  { id: "flowers", emoji: "💐", nameJa: "せいか（かれたもの）", nameVi: "Hoa tươi đã héo", categoryId: "moeru", note: "Thuộc nhóm \"đồ vật khác\" trong rác cháy được." },
  { id: "stuffed_toy", emoji: "🧸", nameJa: "ぬいぐるみ", nameVi: "Thú nhồi bông", categoryId: "moeru", note: "Đồ vải bông nhồi -- rác cháy được." },
  { id: "diaper", emoji: "🩲", nameJa: "しようずみかみおむつ", nameVi: "Tã giấy đã dùng", categoryId: "moeru", note: "Tã dùng một lần được nêu rõ trong bài học là rác cháy được." },
  { id: "rope", emoji: "🪢", nameJa: "ひも・ロープ", nameVi: "Dây, thừng", categoryId: "moeru", note: "Dùng để buộc các loại rác khác, bản thân nó cũng là rác cháy được." },
  { id: "branches", emoji: "🌿", nameJa: "きのえだ（たばねたもの）", nameVi: "Cành cây (đã bó lại)", categoryId: "moeru", note: "Cắt thành đoạn khoảng 50cm và buộc bằng dây trước khi vứt." },
  { id: "socks", emoji: "🧦", nameJa: "くつした（ぬのせい）", nameVi: "Tất/vớ vải", categoryId: "moeru", note: "Đồ vải -- cùng nhóm với quần áo cũ." },

  // もえないゴミ
  { id: "broken_bowl", emoji: "🍶", nameJa: "われたちゃわん", nameVi: "Bát sứ bị vỡ", categoryId: "moenai", note: "Đồ sứ/gốm vỡ thuộc rác không cháy được." },
  { id: "clock", emoji: "🕐", nameJa: "かけどけい", nameVi: "Đồng hồ treo tường", categoryId: "moenai", note: "Đồ vật nhỏ bằng nhựa/kim loại tổng hợp." },
  { id: "knife", emoji: "🔪", nameJa: "ほうちょう・ハサミ", nameVi: "Dao, kéo", categoryId: "moenai", note: "Phải gói bằng giấy báo, ghi rõ \"nguy hiểm\" (kiken) bên ngoài, KHÔNG bỏ chung túi với rác không cháy khác." },
  { id: "lightbulb", emoji: "💡", nameJa: "でんきゅう", nameVi: "Bóng đèn (loại thường)", categoryId: "moenai", note: "Thủy tinh + kim loại -- rác không cháy được." },
  { id: "plant_pot", emoji: "🪴", nameJa: "うえきばち（とうき）", nameVi: "Chậu cây bằng gốm sứ", categoryId: "moenai", note: "Đồ gốm sứ -- rác không cháy được." },
  { id: "fan", emoji: "🌀", nameJa: "せんぷうき", nameVi: "Quạt điện (loại nhỏ)", categoryId: "moenai", note: "Đồ điện nhỏ không thuộc luật tái chế gia dụng lớn." },
  { id: "vacuum", emoji: "🧹", nameJa: "そうじき", nameVi: "Máy hút bụi (loại nhỏ)", categoryId: "moenai", note: "Đồ điện nhỏ -- khác với tủ lạnh/máy giặt/điều hòa/tivi (loại lớn)." },
  { id: "bike_tire", emoji: "🚲", nameJa: "じてんしゃのタイヤ", nameVi: "Lốp xe đạp", categoryId: "moenai", note: "Cao su + kim loại -- rác không cháy được." },
  { id: "hanger", emoji: "👔", nameJa: "ハンガー（はりがね）", nameVi: "Móc áo bằng dây kẽm", categoryId: "moenai", note: "Kim loại nhỏ -- rác không cháy được." },
  { id: "kettle_small", emoji: "🫖", nameJa: "でんきポット", nameVi: "Bình đun nước điện (loại nhỏ)", categoryId: "moenai", note: "Đồ điện nhỏ -- rác không cháy được." },

  // しげんゴミ
  { id: "can", emoji: "🥫", nameJa: "あきかん", nameVi: "Lon rỗng", categoryId: "shigen", note: "Rửa sạch trước khi vứt. Có thể tái chế thành lon mới, vành xe, vật liệu xây dựng." },
  { id: "glass_bottle", emoji: "🍾", nameJa: "あきびん", nameVi: "Chai thủy tinh (còn nguyên)", categoryId: "shigen", note: "Chai vỡ thì xếp vào rác không cháy được, chai còn nguyên thì tái chế." },
  { id: "newspaper", emoji: "📰", nameJa: "しんぶんし", nameVi: "Báo cũ", categoryId: "shigen", note: "Giấy sạch, khô ráo có thể tái chế thành báo/tạp chí mới." },
  { id: "magazine", emoji: "📖", nameJa: "ざっし", nameVi: "Tạp chí", categoryId: "shigen", note: "Có thể tái chế thành thùng các tông, sách ảnh." },
  { id: "cardboard", emoji: "📦", nameJa: "だんボール", nameVi: "Thùng các tông", categoryId: "shigen", note: "Buộc gọn bằng dây trước khi vứt." },
  { id: "milk_carton", emoji: "🥛", nameJa: "ぎゅうにゅうパック（あらってひらいたもの）", nameVi: "Hộp sữa (đã rửa sạch, mở ra)", categoryId: "shigen", note: "Rửa và phơi khô, cắt mở ra -- tái chế thành khăn giấy/giấy vệ sinh." },
  { id: "pot_pan", emoji: "🍳", nameJa: "なべ・フライパン", nameVi: "Nồi, chảo cũ", categoryId: "shigen", note: "Đồ dùng chỉ làm từ kim loại được xếp vào rác tài nguyên." },
  { id: "food_tray", emoji: "🍱", nameJa: "しょくひんトレー（あらったもの）", nameVi: "Khay đựng thịt/cá (đã rửa)", categoryId: "shigen", note: "Nếu không rửa sạch được vết bẩn thì bỏ vào rác cháy được." },
  { id: "cookie_tin", emoji: "🥫", nameJa: "クッキーかん（きんぞく）", nameVi: "Hộp bánh quy bằng kim loại", categoryId: "shigen", note: "Kim loại -- rác tài nguyên." },

  // プラスチックゴミ
  { id: "noodle_cup", emoji: "🍜", nameJa: "カップめんのようき", nameVi: "Vỏ mì ly", categoryId: "plastic", note: "Rửa sạch trước khi vứt vào rác nhựa." },
  { id: "styrofoam", emoji: "📦", nameJa: "はっぽうスチロール", nameVi: "Xốp (styrofoam)", categoryId: "plastic", note: "Nhẹ và mỏng -- thường xếp vào rác nhựa." },
  { id: "plastic_dish", emoji: "🍽️", nameJa: "プラスチックしょっき", nameVi: "Bát đĩa nhựa", categoryId: "plastic", note: "Có dấu \"プラ\" thì xếp vào rác nhựa/tài nguyên." },
  { id: "shampoo_bottle", emoji: "🧴", nameJa: "シャンプーボトル", nameVi: "Chai dầu gội (rỗng)", categoryId: "plastic", note: "Rửa sạch trước khi vứt." },
  { id: "sauce_bottle", emoji: "🍶", nameJa: "ソース・マヨネーズようき", nameVi: "Chai tương/sốt mayonnaise (rỗng)", categoryId: "plastic", note: "Rửa sạch trước khi vứt." },
  { id: "wash_basin", emoji: "🪣", nameJa: "せんめんき（プラせい）", nameVi: "Chậu rửa mặt bằng nhựa", categoryId: "plastic", note: "Đồ nhựa dày hơn thẻ ngân hàng có thể xếp vào rác không cháy được tùy địa phương." },

  // ペットボトル
  { id: "pet_bottle_water", emoji: "🍾", nameJa: "みずのペットボトル", nameVi: "Chai nước PET", categoryId: "pet", note: "Tháo nắp, tháo nhãn, rửa sạch trước khi vứt." },
  { id: "pet_bottle_tea", emoji: "🧃", nameJa: "おちゃのペットボトル", nameVi: "Chai trà PET", categoryId: "pet", note: "Cùng quy tắc: tháo nắp/nhãn, rửa sạch." },

  // そだいゴミ
  { id: "table", emoji: "🪑", nameJa: "もくせいテーブル", nameVi: "Bàn gỗ", categoryId: "sodai", note: "Đồ nội thất lớn, không vừa túi 20 lít." },
  { id: "chair", emoji: "🪑", nameJa: "いす", nameVi: "Ghế", categoryId: "sodai", note: "Nếu tháo rời được thành mảnh nhỏ có thể vứt vào ngày rác cháy được." },
  { id: "bed", emoji: "🛏️", nameJa: "ベッド", nameVi: "Giường", categoryId: "sodai", note: "Đồ nội thất lớn -- rác cồng kềnh." },
  { id: "mattress", emoji: "🛏️", nameJa: "マットレス", nameVi: "Nệm", categoryId: "sodai", note: "Đồ dùng giường chiếu cỡ lớn." },
  { id: "futon", emoji: "🛌", nameJa: "かけぶとん", nameVi: "Chăn/đệm bông", categoryId: "sodai", note: "Đồ dùng giường chiếu -- rác cồng kềnh." },
  { id: "wardrobe", emoji: "🗄️", nameJa: "タンス", nameVi: "Tủ quần áo", categoryId: "sodai", note: "Đồ nội thất lớn -- rác cồng kềnh." },
  { id: "carpet", emoji: "🧶", nameJa: "カーペット", nameVi: "Thảm trải sàn (cỡ lớn)", categoryId: "sodai", note: "Thảm cao cấp cỡ lớn được nêu trong bài học là rác cồng kềnh." },
  { id: "tatami", emoji: "🟫", nameJa: "たたみ", nameVi: "Chiếu tatami", categoryId: "sodai", note: "Kích thước lớn -- rác cồng kềnh." },
  { id: "desk", emoji: "🗄️", nameJa: "じむようデスク", nameVi: "Bàn làm việc", categoryId: "sodai", note: "Đồ nội thất lớn -- rác cồng kềnh." },

  // おおがたかでん
  { id: "fridge", emoji: "🧊", nameJa: "れいぞうこ", nameVi: "Tủ lạnh", categoryId: "kaden", note: "Thuộc luật tái chế đồ điện gia dụng -- không vứt như rác cồng kềnh." },
  { id: "washer", emoji: "🌀", nameJa: "せんたくき", nameVi: "Máy giặt", categoryId: "kaden", note: "Phải liên hệ cửa hàng hoặc đơn vị thu gom chỉ định (có phí)." },
  { id: "aircon", emoji: "❄️", nameJa: "エアコン", nameVi: "Máy điều hòa", categoryId: "kaden", note: "Không thể vứt vào ngày rác thường dù đã tháo rời." },
  { id: "tv", emoji: "📺", nameJa: "えきしょうテレビ", nameVi: "Tivi", categoryId: "kaden", note: "Thuộc 4 mặt hàng chính của luật tái chế gia dụng lớn." },

  // きけん・ゆうがいゴミ
  { id: "battery", emoji: "🔋", nameJa: "かんでんち", nameVi: "Pin khô", categoryId: "kiken", note: "Thu gom riêng theo lịch của địa phương." },
  { id: "spray_can", emoji: "🧴", nameJa: "スプレーかん", nameVi: "Bình xịt", categoryId: "kiken", note: "Phải xì hết ga (đâm thủng, làm xẹp) trước khi vứt vì có nguy cơ phát nổ." },
  { id: "fluorescent", emoji: "💡", nameJa: "けいこうとう", nameVi: "Đèn huỳnh quang", categoryId: "kiken", note: "Chứa hóa chất -- thu gom riêng, không cùng rác không cháy thường." },
  { id: "lighter", emoji: "🔥", nameJa: "ライター", nameVi: "Bật lửa", categoryId: "kiken", note: "Có nguy cơ cháy nổ -- xếp vào rác nguy hiểm." },
  { id: "thermometer", emoji: "🌡️", nameJa: "たいおんけい", nameVi: "Nhiệt kế đã qua sử dụng", categoryId: "kiken", note: "Thu gom riêng theo lịch của địa phương." },

  // とくべつかいしゅう
  { id: "computer", emoji: "🖥️", nameJa: "パソコン", nameVi: "Máy tính để bàn", categoryId: "special", note: "Chứa nhiều thông tin cá nhân -- liên hệ nhà sản xuất để thu lại." },
  { id: "laptop", emoji: "💻", nameJa: "ノートパソコン", nameVi: "Laptop", categoryId: "special", note: "Không được vứt như rác thường; nhà sản xuất sẽ xóa dữ liệu khi thu hồi." },
  { id: "mobile", emoji: "📱", nameJa: "けいたいでんわ", nameVi: "Điện thoại di động cũ", categoryId: "special", note: "Được thu gom tại tòa thị chính hoặc cửa hàng điện thoại." },
];

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: "tf1",
    statementVi:
      "Khi đi đổ rác, bạn có thể mặc quần áo gì cũng được, không cần chú ý gì cả.",
    correct: false,
    explanationVi:
      "Không cần ăn mặc đẹp, nhưng vì có thể gặp hàng xóm nên đừng mặc đồ khiến người khác thấy kỳ quặc.",
  },
  {
    id: "tf2",
    statementVi: "Rác bốc mùi thì cứ cho vào túi bình thường như mọi khi rồi vứt.",
    correct: false,
    explanationVi: "Nếu rác có mùi hôi, hãy bọc gấp đôi túi để tránh mùi bốc ra ngoài, làm phiền người khác.",
  },
  {
    id: "tf3",
    statementVi: "Khi đi đổ rác, bạn có thể bỏ bao nhiêu túi rác tùy thích.",
    correct: false,
    explanationVi: "Nhiều địa phương giới hạn khoảng 2-4 túi rác mỗi lần, không được vứt tùy thích.",
  },
  {
    id: "tf4",
    statementVi: "Bình xịt đã dùng hết thì cứ để nguyên rồi bỏ vào túi rác.",
    correct: false,
    explanationVi: "Phải xì hết khí gas bên trong (đâm thủng, làm xẹp) trước khi vứt vì có thể phát nổ.",
  },
  {
    id: "tf5",
    statementVi:
      "Bạn thấy rác bốc mùi hôi nhưng không để ý, vẫn mang ra bãi rác như bình thường.",
    correct: false,
    explanationVi: "Khi túi rác có mùi hôi, nên bọc gấp đôi để tránh gây phiền cho người khác và thu hút động vật.",
  },
  {
    id: "tf6",
    statementVi:
      "Vì thấy việc xì hết khí thật phiền phức nên bạn để nguyên bình xịt đã dùng hết rồi vứt đi.",
    correct: false,
    explanationVi:
      "Dù chỉ còn một lượng nhỏ khí bên trong cũng có thể phát nổ -- phải xì hết khí trước khi vứt.",
  },
  {
    id: "tf7",
    statementVi:
      "Dù đó không phải rác của bạn, nếu thấy rác lộ ra ngoài lưới thì bạn vẫn nên cho lại vào lưới cho gọn gàng.",
    correct: true,
    explanationVi:
      "Đúng vậy. Rác lộ ra ngoài sẽ thu hút động vật đến và trở thành vấn đề chung cho khu vực, nên ai thấy cũng nên xử lý giúp.",
  },
  {
    id: "tf8",
    statementVi:
      "Vì sáng hôm sau phải ra khỏi nhà sớm nên bạn mang rác ra đổ vào tối hôm trước.",
    correct: false,
    explanationVi:
      "Dù phải đi sớm, vẫn nên đổ rác vào buổi sáng cùng ngày -- đổ ban đêm có thể bị người khác/động vật lục lọi.",
  },
  {
    id: "tf9",
    statementVi:
      "Phân loại và xử lý rác đúng cách không chỉ tốt cho môi trường mà còn tốt cho sức khỏe của mọi người.",
    correct: true,
    explanationVi:
      "Đúng vậy. Nếu đốt nhầm rác không cháy được, có thể sinh ra chất độc hại cho cơ thể -- nên phân loại đúng rất quan trọng.",
  },
  {
    id: "tf10",
    statementVi:
      "Vì giá sách có thể tháo rời và thu gọn nên bạn tháo ra, bó gọn rồi vứt vào ngày rác cháy được.",
    correct: true,
    explanationVi:
      "Đúng, nhưng cần chú ý quy định về kích thước của từng địa phương, và buộc gọn bằng dây trước khi vứt.",
  },
  {
    id: "tf11",
    statementVi:
      "Dao, kéo là rác không cháy được nên bạn cho chung vào túi với rác không cháy được khác rồi vứt.",
    correct: false,
    explanationVi:
      "Phải để dao, kéo vào túi riêng, ghi rõ \"nguy hiểm\" (kiken) bên ngoài rồi mới vứt -- không để chung với rác không cháy khác.",
  },
  {
    id: "tf12",
    statementVi: "Ở Nhật, việc mang rác đến vứt ở nhiều điểm thu gom khác nhau là vi phạm quy tắc.",
    correct: true,
    explanationVi:
      "Đúng. Thường mỗi hộ chỉ được sử dụng một điểm thu gom rác cố định, dù rác nhiều cũng không được chia ra nhiều điểm.",
  },
  {
    id: "tf13",
    statementVi:
      "Nhật Bản là đất nước an toàn nên khi vứt máy tính, bạn không cần lo lắng gì, cứ vứt vào rác không cháy được.",
    correct: false,
    explanationVi:
      "Máy tính chứa nhiều thông tin cá nhân có thể bị lạm dụng -- phải liên hệ nhà sản xuất để thu hồi, không vứt như rác thường.",
  },
  {
    id: "tf14",
    statementVi:
      "Khay đựng thịt/cá phải rửa sạch rồi vứt vào rác tài nguyên; khay nào rửa không sạch thì vứt vào rác cháy được.",
    correct: true,
    explanationVi: "Đúng vậy -- đây chính là quy tắc chuẩn cho loại rác này.",
  },
  {
    id: "tf15",
    statementVi:
      "Ở Nhật đã có người khác dọn dẹp bãi rác nên bạn không cần tham gia dọn dẹp.",
    correct: false,
    explanationVi:
      "Người dân trong khu vực thay phiên nhau dọn dẹp điểm thu gom rác -- đến lượt mình thì bạn cũng cần hợp tác.",
  },
];

export const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceQuestion[] = [
  {
    id: "mc1",
    promptVi: "Bạn được phép mang rác ra điểm thu gom vào khoảng thời gian nào?",
    options: [
      "Từ 22h tối hôm trước",
      "Từ nửa đêm (0h) ngày hôm đó",
      "Từ 5 giờ sáng đến 8 giờ sáng ngày hôm đó",
      "Từ 8 giờ sáng đến 12 giờ trưa ngày hôm đó",
    ],
    correctIndex: 2,
    explanationVi:
      "Nguyên tắc chung là đổ rác vào sáng ngày thu gom, trước khi xe rác đến (thường khoảng 8h sáng). Đổ ban đêm dễ thu hút động vật hoang dã và người lục lọi trái phép.",
  },
  {
    id: "mc2",
    promptVi: "Ở Nhật, khi không dùng máy tính nữa, bạn nên làm gì?",
    options: [
      "Vứt vào ngày rác cồng kềnh",
      "Liên hệ nhà sản xuất máy tính để họ thu lại",
      "Bán ở chợ trời mà không xử lý gì thêm",
      "Vứt vào rác không cháy được như bình thường",
    ],
    correctIndex: 1,
    explanationVi:
      "Máy tính chứa nhiều thông tin cá nhân nên không thể vứt như rác thường. Cách tốt nhất là liên hệ nhà sản xuất -- họ sẽ xóa toàn bộ dữ liệu cá nhân khi thu hồi.",
  },
  {
    id: "mc3",
    promptVi: "Vì sao quy định phân loại rác lại khác nhau tùy theo khu vực (thành phố/thị trấn)?",
    options: [
      "Vì lối sống khác nhau tùy khu vực",
      "Vì lượng rác thải khác nhau tùy khu vực",
      "Vì loại rác thải khác nhau tùy khu vực",
      "Vì mức độ hiện đại của cơ sở đốt rác khác nhau tùy khu vực",
    ],
    correctIndex: 1,
    explanationVi:
      "Lý do chính là lượng rác thải khác nhau theo từng khu vực: nơi đông dân có nhiều rác hơn, nên nếu quy định phân loại quá chi tiết sẽ tốn nhiều nhân lực và chi phí xử lý.",
  },
  {
    id: "mc4",
    promptVi:
      "Đồ vật bằng nhựa mỏng hơn thẻ ngân hàng (dưới khoảng 0.76mm) thường được xếp vào loại rác nào?",
    options: [
      "Rác cháy được",
      "Rác không cháy được",
      "Rác cồng kềnh",
      "Đồ điện gia dụng cỡ lớn",
    ],
    correctIndex: 0,
    explanationVi:
      "Theo quy tắc phổ biến: đồ nhựa mỏng hơn thẻ ngân hàng thì xếp vào rác cháy được; dày hơn thì xếp vào rác không cháy được.",
  },
];
