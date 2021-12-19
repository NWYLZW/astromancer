import "./index.scss";
let sumData: number[] = [];

const genElement = (html: string) => {
  const template = document.createElement("div");
  template.innerHTML = html;
  return template.firstChild as HTMLElement;
};

let curDraggedDiv: HTMLDivElement | null = null;

document
  .querySelectorAll(
    "div.col-12.d-block.width-full.py-4.border-bottom.color-border-muted"
  )
  .forEach((div) => {
    div.setAttribute("draggable", "true");
    (<HTMLDivElement>div).addEventListener("dragover", (event) => {
      curDraggedDiv = <HTMLDivElement>div;
    });
  });
let temp = document.querySelectorAll(
  "div.Box > a.d-block.Box-row.Box-row--hover-gray.mt-0.color-fg-default.no-underline"
);

temp.forEach((ele, index) => {
  const a = <HTMLAnchorElement>ele;
  let num = a?.querySelector("div")?.querySelector("div")?.innerText[0] || 0;
  console.log(num);
  sumData[index] = Number(num)!;
});

temp.forEach((ele, index) => {
  const a = <HTMLAnchorElement>ele;
  a.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  a.addEventListener("dragenter", (event) => {
    event.preventDefault();
  });
  a.addEventListener("drop", async (event) => {
    let { href } = curDraggedDiv?.querySelector(
      "div.d-inline-block.mb-1 > h3 > a"
    ) as HTMLAnchorElement;
    const formDiv = genElement(
      await fetch(
        `https://github.com${href.replace(
          `${location.protocol}//${location.host}`,
          ""
        )}/lists`
      ).then((r) => r.text())
    ) as HTMLDivElement;

    const form = formDiv.querySelector(
      "form.js-user-list-menu-form"
    ) as HTMLFormElement;
    const targetList = a.querySelector("h3.f4.text-bold") as HTMLHeadingElement;
    form.querySelectorAll("div.form-checkbox").forEach((div) => {
      const input = div.querySelector(
        "input.js-user-list-menu-item"
      ) as HTMLInputElement;
      const label = div.querySelector("span.Truncate-text") as HTMLSpanElement;
      if (label.innerText === targetList.innerText) {
        input.checked = true;
      }
      // console.log(label.innerText, input.checked)
    });
    // console.log(targetList.innerText, form)
    document.body.appendChild(form);
    await fetch(form.action, {
      method: "post",
      headers: {
        accept: "application/json",
      },
      body: new FormData(form),
    });
    if (sumData[index] == 0) {
      let template = `<div class="d-flex flex-row flex-items-baseline flex-justify-between">
          <h3 class="f4 text-bold no-wrap mr-3">${
            ele!.querySelector("h3")!.innerText
          }</h3>
          <div class="color-fg-muted text-small no-wrap">1 repository</div>
        </div>`;
      ele!.querySelector("h3")!.remove();
      let tempNode = document.createElement("template");
      tempNode.innerHTML = template;
      ele.appendChild(tempNode.content.firstChild!);
    }
    sumData[index] += 1;
    let repositoriesInnerText = a
      .querySelector("div")!
      .querySelector("div")!.innerText;
    let repositoriesInnerTextStrArr = repositoriesInnerText.split(" ");
    repositoriesInnerTextStrArr[0] = String(sumData[index]);
    a.querySelector("div")!.querySelector("div")!.innerText =
      repositoriesInnerTextStrArr.join(" ");
    document.body.removeChild(form);
  });
});

console.log("astromancer is starting.");
