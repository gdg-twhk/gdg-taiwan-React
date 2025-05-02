import { Card, CardContent } from "../ui/card";
import Link from "next/link";
export default function CodeOfConductSection() {
  return (
    <section className="flex flex-col items-center justify-center bg-muted">
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-5xl font-bold text-google-red">行為準則</h1>
        <Card className="w-full max-w-4xl mt-10">
          <CardContent className="flex flex-col gap-5 p-6">
            <h5>GDG Taiwan 致力於為所有人提供一個沒有騷擾且包容的活動體驗，不論性別身份和表現、性傾向、殘疾、外貌、體型、種族、國籍、年齡、宗教或其他受保護的類別。我們不容忍對參加者任何形式的騷擾。GDG Taiwan 重視我們的政策違規行為，會作出適當回應。</h5>
            <h5 className="mt-0 text-google-red font-bold">所有 GDG Taiwan 活動的參與者必須遵守以下政策：</h5>
            <div>
              <ol className="list-decimal list-inside">
                <li>所有參與者要彼此相互尊重。我們希望這個活動對所有人都是一個很棒的體驗，不論性別身份和表現、性傾向、殘疾、外貌、體型、種族、國籍、年齡、宗教或其他受保護的類別。要對每個人表示尊重。參與活動時要承認每個人都有權在這裡，並且每個人都有權享受我們的體驗，而不必擔心騷擾、歧視或輕視，無論是明顯的還是通過微妙的侵害。玩笑不應該貶低他人。考慮你所說的話，如果有人對你說或談到你，會有什麼感覺。</li>
                <li>如果你看到或聽到了什麼，請說出來。不容忍騷擾，你有權在自己或他人受到不尊重時禮貌地介入。使你感到不舒服的人可能不知道他們在做什麼，鼓勵禮貌地向他們提醒他們的行為。如果一位參與者參與騷擾或令人不悅的行為，活動組織者可以採取他們認為適當的任何行動，包括警告或不退款地將犯罪者從活動中解僱。如果您正在遭受騷擾，或者感到不舒服，注意到其他人正在遭受騷擾，或有任何其他問題，請立即聯繫活動工作人員。</li>
                <li>不容忍騷擾。騷擾包括但不限於：加強性别身份和表達、性向、殘疾、外貌、體型、種族、國籍、種族、年齡、宗教或其他受保護的群體的社會結構的口頭語言；公共空間中的性意象；故意恐嚇；跟踪；騷擾攝影或錄音；持續扰擾演講或其他活動；無禮的口頭語言；不適當的身體接觸；以及不受歡迎的性關注。要求停止任何騷擾行為的參與者預計立即遵守。</li>
                <li>實踐對彼此說「Yes（你的想法）…，and（我的想法）…」。這是一種戲劇即興技巧，以建立彼此的想法。當我們一同實踐時彼此都會受益。</li>
              </ol>
              <p className="mt-4">這項政策適用於演講、論壇、工作坊、代碼實驗室、社交媒體、派對、走廊談話、所有參與者、合作夥伴、贊助商、志工、活動工作人員等。 GDG Taiwan保留在其唯一判断下，拒絕任何人參加任何GDG Taiwan舉辦的（以及未來的）活動的權利。這包括但不限於，參加者行為不端或未遵守本政策和相關條款。如果參與者進行騷擾或令人不悅的行為，活動組織者可以採取他們認為適當的任何行動，包括警告或不退還費用地將犯規者從活動中驅逐。</p>
              <p className="mt-4">我們的活動工作人員通常可以通過特殊徽章/服裝識別。我們的零容忍政策意味著，我們將調查和審查每一項違反我們活動社群指南和反騷擾政策的指控，並做出適當的回應。請注意，儘管我們認真審視每一項投訴，但我們會根據自己的判斷決定何時和如何跟進報告的事件，並可能拒絕采取任何進一步行動，並/或將參與者引導到其他資源以解決。</p>
              <p className="mt-4">活動工作人員很願意幫助參與者聯繫酒店/場地安全或當地執法部門，提供護送或以其他方式協助那些感到不適或受到騷擾的人在活動期間感到安全。我們重視您的出席。</p>
              <p className="mt-4">如果您的人身安全或他人身體安全受到威脅，請立即撥打 110。</p>
              <ul className="list-disc list-inside mt-4">
                <li> 行為準則團隊 : GDG Taiwan</li>
                <li> 主辦單位 : GDG Taiwan</li>
                <li> 性騷擾防治-衛生福利部 性騷擾諮詢專線 (24小時) : 113</li>
              </ul>
              <br />
              展示合作夥伴、贊助商或供應商攤位或類似活動也受此政策的約束。特別是，展商不應使用性化的圖像、活動或其他材料。攤位工作人員（包括志願者）不應使用性化的服裝/制服/服裝，或者以其他方式創造性化的環境。參與者和展出合作夥伴或贊助商違反此政策的將得到通知，並有望立即停止任何違反行為。
          </div>
          <h5 className="mt-4 text-google-red font-bold">合作夥伴與贊助商</h5>
          <p>如果合作夥伴或贊助商不遵守此政策，將會收到通知，並有望立即停止任何違反行為。</p>
          <h5 className="mt-4 text-google-red font-bold">為什麼這項政策很重要</h5>
          <p>不幸的是，在活動和線上社群中的騷擾是很常見的。通過創建正式政策旨在改善這種情況，明確表明在我們的活動和社群中不接受基於任何原因騷擾任何人。這項政策可以通過明確定義行為期望值防止騷擾，旨在提供保證，並鼓勵在其他活動中遇到不好經歷的人參與這個活動。</p>
          <h5 className="mt-4 text-google-red font-bold">授權和發布</h5>
          <p>
            此政策以<Link className="text-google-red underline" href="https://creativecommons.org/publicdomain/zero/1.0/deed.zh_TW" target="_blank">知識共享零許可證（Creative Commons Zero license）</Link>授權。此政策基於並受到其他多個社群政策的影響，包括：俄亥俄LinuxFest反騷擾政策、Con反騷擾項目、Geek Feminism Wiki（由Ada Initiative創建）、ConfCodeofConduct.com、JSconf、Rust、Python中的多樣性以及Write / Speak / Code。
          </p>
        </CardContent>
        </Card>
      </div>
    </section>
  );
}
