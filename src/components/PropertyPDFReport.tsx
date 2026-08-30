import type { Property } from "@/components/PropertyCard";

export function generatePDFReport(property: Property) {
  const content = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<title>تقرير العقار - ${property.title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'IBM Plex Sans Arabic', Arial, sans-serif; padding: 40px; color: #20211f; }
  .header { border-bottom: 3px solid #b88a5a; padding-bottom: 20px; margin-bottom: 30px; }
  .header h1 { font-size: 24px; margin-bottom: 8px; }
  .header p { color: #77736c; font-size: 13px; }
  .section { margin-bottom: 24px; }
  .section h2 { font-size: 16px; color: #b88a5a; border-bottom: 1px solid #ddd8cf; padding-bottom: 8px; margin-bottom: 12px; }
  .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0ede6; }
  .row .label { color: #77736c; font-size: 13px; }
  .row .value { font-weight: 600; font-size: 13px; }
  .price-box { background: #f7f5f0; padding: 20px; text-align: center; margin: 20px 0; }
  .price-box .amount { font-size: 28px; font-weight: 700; }
  .footer { border-top: 1px solid #ddd8cf; padding-top: 16px; margin-top: 40px; font-size: 11px; color: #77736c; text-align: center; }
</style>
</head>
<body>
  <div class="header">
    <h1>المحضار للعقار — تقرير العقار</h1>
    <p>تقرير مفصل عن العقار: ${property.title}</p>
  </div>

  <div class="price-box">
    <div class="amount">${property.price}</div>
    <div style="color:#77736c;margin-top:4px">${property.deal}</div>
  </div>

  <div class="section">
    <h2>المعلومات الأساسية</h2>
    <div class="row"><span class="label">العنوان</span><span class="value">${property.title}</span></div>
    <div class="row"><span class="label">نوع العقار</span><span class="value">${property.type}</span></div>
    <div class="row"><span class="label">نوع الصفقة</span><span class="value">${property.deal}</span></div>
    <div class="row"><span class="label">الموقع</span><span class="value">${property.location}</span></div>
    <div class="row"><span class="label">المساحة</span><span class="value">${property.area}</span></div>
    ${property.beds !== "بيانات غير متاحة" ? `<div class="row"><span class="label">الغرف</span><span class="value">${property.beds}</span></div>` : ""}
    ${property.baths !== "بيانات غير متاحة" ? `<div class="row"><span class="label">الحمامات</span><span class="value">${property.baths}</span></div>` : ""}
  </div>

  <div class="section">
    <h2>الوصف</h2>
    <p style="font-size:13px;line-height:1.9;color:#555">
      ${property.description || `${property.title} - يقع في ${property.location} بمساحة ${property.area}. متاح للبيع بسعر ${property.price}.`}
    </p>
  </div>

  <div class="footer">
    <p>© ${new Date().getFullYear()} المحضار للعقار — المملكة العربية السعودية</p>
    <p> للتواصل: +966 500 094 550</p>
  </div>
</body>
</html>`;

  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, "_blank");
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(url);
    };
  }
}
