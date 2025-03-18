document.addEventListener("DOMContentLoaded", function() {

	
	const didaktikaiCelokCheckboxok = document.querySelectorAll('input[name="didaktikai_celok"]');
	const kivalasztottCelok = [];

	didaktikaiCelokCheckboxok.forEach(function(checkbox) {
		checkbox.addEventListener("change", function() {
			if (checkbox.checked) {
				kivalasztottCelok.push(checkbox.value);
			} else {
				const index = kivalasztottCelok.indexOf(checkbox.value);
				if (index > -1) {
					kivalasztottCelok.splice(index, 1);
				}
			}
		console.log("Kiválasztott célok:", kivalasztottCelok);
    });
});


	const xhrTantargyak = new XMLHttpRequest();
	xhrTantargyak.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTantargyak", true);
	xhrTantargyak.onload = function() {
		if (xhrTantargyak.status === 200) {
			const tantargyak = JSON.parse(xhrTantargyak.responseText);
			const selectSubject = document.getElementById("subject");

			tantargyak.forEach(function(tantargy) {
				const option = document.createElement("option");
				option.value = tantargy.targy_id;
				option.textContent = tantargy.targy_nev;
				selectSubject.appendChild(option);
			});
		} else {
			console.error("Hiba történt a tantárgyak lekérésekor.");
		}
	};
	xhrTantargyak.send();

	document.getElementById("subject").addEventListener("change", function() {
		const subjectId = this.value;

		if (subjectId) {
			const xhrTankonyvek = new XMLHttpRequest();
			xhrTankonyvek.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTankonyvek&targy_id=" + subjectId, true);
			xhrTankonyvek.onload = function() {
				if (xhrTankonyvek.status === 200) {
					const tankonyvek = JSON.parse(xhrTankonyvek.responseText);
					const selectTankonyv = document.getElementById("tankonyv");
					selectTankonyv.innerHTML = "<option value=''>Válassz tankönyvet...</option>";

					tankonyvek.forEach(function(tankonyv) {
						const option = document.createElement("option");
						option.value = tankonyv.tk_id;
						option.textContent = tankonyv.tk_cim;
						selectTankonyv.appendChild(option);
					});
				} else {
					console.error("Hiba történt a tankönyvek lekérésekor.");
				}
			};
			xhrTankonyvek.send();
		}
	});

	document.getElementById("tankonyv").addEventListener("change", function() {
		const tankonyvId = this.value;

		if (tankonyvId) {
			const xhrTankonyvAdatok = new XMLHttpRequest();
			xhrTankonyvAdatok.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTankonyvAdatok&tk_id=" + tankonyvId, true);
			xhrTankonyvAdatok.onload = function() {
				if (xhrTankonyvAdatok.status === 200) {
					try {
						const tankonyvAdatok = JSON.parse(xhrTankonyvAdatok.responseText);
						const resourcesTextarea = document.getElementById("resources");

						if (resourcesTextarea && tankonyvAdatok) {
							const formattedText = `Cím: ${tankonyvAdatok.cim} Szerző: ${tankonyvAdatok.szerzo} Kiadási év: ${tankonyvAdatok.kiadas_ev}`;
							resourcesTextarea.value = formattedText;
						}
					} catch (e) {
						console.error("Hiba történt a JSON feldolgozása közben: ", e);
						console.log("Szerver válasza:", xhrTankonyvAdatok.responseText); 
					}
				} else {
					console.error("Hiba történt a tankönyv adatainak lekérésekor. HTTP státusz:", xhrTankonyvAdatok.status);
				}
			};
			xhrTankonyvAdatok.send();
			const xhrTemak = new XMLHttpRequest();
			xhrTemak.open("GET", `https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTemakByTankonyv&tk_id=${tankonyvId}`, true);
			xhrTemak.onload = function() {
				if (xhrTemak.status === 200) {
					console.log(xhrTemak.responseText);
					const temak = JSON.parse(xhrTemak.responseText);
					console.log(temak);
					const selectTema = document.getElementById("tema");
					selectTema.innerHTML = "<option value=''>Válassz témát...</option>"; 

					temak.forEach(function(tema) {
						const option = document.createElement("option");
						option.value = tema.tema_id;
						option.textContent = tema.tema_nev;
						selectTema.appendChild(option);
					});
				} else {
					console.error("Hiba történt a témák lekérésekor.");
				}
			};
			xhrTemak.send();
		}
	});

	const tankonyvId = this.value;
	if (tankonyvId) {
		const xhrTemak = new XMLHttpRequest();
		xhrTemak.open("GET", `https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTemakByTankonyv&tk_id=${tankonyvId}`, true);
		xhrTemak.onload = function() {
			if (xhrTemak.status === 200) {
				const temak = JSON.parse(xhrTemak.responseText);
				const selectTema = document.getElementById("tema");
				selectTema.innerHTML = "<option value=''>Válassz témát...</option>"; 

				temak.forEach(function(tema) {
					const option = document.createElement("option");
					option.value = tema.tema_id;
					option.textContent = tema.tema_nev;
					selectTema.appendChild(option);
				});
			} else {
				console.error("Hiba történt a témák lekérésekor.");
			}
		};
		xhrTemak.send();
	}
});


const xhrCelok = new XMLHttpRequest();
xhrCelok.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getCelok", true);
xhrCelok.onload = function() {
	console.log(xhrCelok);
	if (xhrCelok.status === 200) {
		console.log(xhrCelok);
		const celok = JSON.parse(xhrCelok.responseText);
		const goalList = document.getElementById("goal-list");

		console.log(celok);

		celok.forEach(function(goal) {
			const listItem = document.createElement("li");
			listItem.textContent = goal.cel_nev;
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.value = goal.cel_id;

			checkbox.addEventListener("change", function() {
				if (checkbox.checked) {
					addedGoals.push(goal.cel_id);
					console.log(goal.cel_id);
				} else {
					const index = addedGoals.indexOf(goal.cel_id);
					if (index > -1) addedGoals.splice(index, 1);
				}
			});

			listItem.appendChild(checkbox);
			goalList.appendChild(listItem);
			console.log(goal.cel_nev);
		});
	}
};
xhrCelok.send();

document.getElementById("add-goals").addEventListener("click", function() {
	addedGoals = [];
	document.getElementById("goal-list").innerHTML = '';

	const xhrCelok = new XMLHttpRequest();
	xhrCelok.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getCelok", true);
	xhrCelok.onload = function() {
		if (xhrCelok.status === 200) {
			const celok = JSON.parse(xhrCelok.responseText);
			const goalList = document.getElementById("goal-list");

			celok.forEach(function(goal) {
				const listItem = document.createElement("li");
				listItem.classList.add("celListElement");
				const span = document.createElement("span");
				span.classList.add("celSpan");
				span.textContent = goal.cel_nev;
				listItem.appendChild(span);
				listItem.dataset.celId = goal.cel_id;
				listItem.dataset.celText = goal.cel_nev;

				const checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.value = goal.cel_id;

				checkbox.addEventListener("change", function() {
					if (checkbox.checked) {
						addedGoals.push(goal.cel_id);
					} else {
						const index = addedGoals.indexOf(goal.cel_id);
						if (index > -1) addedGoals.splice(index, 1);
					}
					console.log(addedGoals);
				});

				listItem.appendChild(checkbox);
				goalList.appendChild(listItem);
			});
		}
	};
	xhrCelok.send();

	document.getElementById("goal-modal").style.display = "block";
});

document.getElementById("close-modal").addEventListener("click", function() {
	document.getElementById("goal-modal").style.display = "none";
});

document.getElementById("save-goals").addEventListener("click", function() {
	const lessonGoals = document.getElementById("lesson-goals");
	const selectedGoals = addedGoals.map(function(goalId) {
		let celListElements = Array.from(document.querySelectorAll(`.celListElement`));
		console.log(celListElements);
		celListElements = celListElements.filter(celListElements => celListElements.dataset.celId == goalId);
		return celListElements.map(celListElement => celListElement.dataset.celText).join(", ");
	});

	if (lessonGoals.value) {
		lessonGoals.value += ", " + selectedGoals.join(", ");
	} else {
		lessonGoals.value = selectedGoals.join(", ");
	}
	document.getElementById("goal-modal").style.display = "none";
});

const xhrDidacticTasks = new XMLHttpRequest();
xhrDidacticTasks.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getDidacticTasks", true);
xhrDidacticTasks.onload = function() {
	if (xhrDidacticTasks.status === 200) {
		const didacticTasks = JSON.parse(xhrDidacticTasks.responseText);
		const didacticTasksList = document.getElementById("didactic-tasks-list");

		didacticTasks.forEach(function(task) {
			const listItem = document.createElement("li");
			listItem.textContent = task.didf_nev;
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.value = task.didf_id;

			checkbox.addEventListener("change", function() {
				if (checkbox.checked) {
					addedDidacticTasks.push(task.didf_id);
				} else {
					const index = addedDidacticTasks.indexOf(task.didf_id);
					if (index > -1) addedDidacticTasks.splice(index, 1);
				}
			});

			listItem.appendChild(checkbox);
			didacticTasksList.appendChild(listItem);
		});
	}
};
xhrDidacticTasks.send();

document.getElementById("add-didactic-tasks").addEventListener("click", function() {
	addedDidacticTasks = [];
	document.getElementById("didactic-tasks-list").innerHTML = '';

	const xhrDidacticTasks = new XMLHttpRequest();
	xhrDidacticTasks.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getDidacticTasks", true);
	xhrDidacticTasks.onload = function() {
		if (xhrDidacticTasks.status === 200) {
			const didacticTasks = JSON.parse(xhrDidacticTasks.responseText);
			const didacticTasksList = document.getElementById("didactic-tasks-list");

			didacticTasks.forEach(function(task) {
				const listItem = document.createElement("li");
				listItem.textContent = task.didf_nev;

				const checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.value = task.didf_id;
				checkbox.setAttribute("data-didactic-task", true);

				checkbox.addEventListener("change", function() {
					if (checkbox.checked) {
						addedDidacticTasks.push(task.didf_id);
					} else {
						const index = addedDidacticTasks.indexOf(task.didf_id);
						if (index > -1) addedDidacticTasks.splice(index, 1);
					}
				});

				listItem.appendChild(checkbox);
				didacticTasksList.appendChild(listItem);
			});
		}
	};
	xhrDidacticTasks.send();

	document.getElementById("didactic-tasks-modal").style.display = "block";
});

document.getElementById("close-didactic-modal").addEventListener("click", function() {
	document.getElementById("didactic-tasks-modal").style.display = "none";
});

document.getElementById("save-didactic-tasks").addEventListener("click", function() {
	const didacticTasksTextarea = document.getElementById("didactic-tasks");
	const selectedTasks = addedDidacticTasks.map(function(taskId) {
		return document.querySelector(`input[data-didactic-task][value="${taskId}"]`).parentElement.textContent.trim();
	});

	if (didacticTasksTextarea.value) {
		didacticTasksTextarea.value += ", " + selectedTasks.join(", ");
	} else {
		didacticTasksTextarea.value = selectedTasks.join(", ");
	}
	document.getElementById("didactic-tasks-modal").style.display = "none";
});

const xhrSubjectConnections = new XMLHttpRequest();
xhrSubjectConnections.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTantargyak", true);
xhrSubjectConnections.onload = function() {
	if (xhrSubjectConnections.status === 200) {
		const tantargyak = JSON.parse(xhrSubjectConnections.responseText);
		const subjectConnectionsList = document.getElementById("subject-connections-list");

		tantargyak.forEach(function(tantargy) {
			const listItem = document.createElement("li");
			listItem.textContent = tantargy.targy_nev;
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.value = tantargy.targy_id;
			checkbox.setAttribute("data-subject-connection", true);

			checkbox.addEventListener("change", function() {
				if (checkbox.checked) {
					addedSubjectConnections.push(tantargy.targy_id);
				} else {
					const index = addedSubjectConnections.indexOf(tantargy.targy_id);
					if (index > -1) addedSubjectConnections.splice(index, 1);
				}
			});

			listItem.appendChild(checkbox);
			subjectConnectionsList.appendChild(listItem);
		});
	}
};
xhrSubjectConnections.send();

document.getElementById("add-subject-connections").addEventListener("click", function() {
	addedSubjectConnections = [];
	document.getElementById("subject-connections-list").innerHTML = '';

	const xhrSubjectConnections = new XMLHttpRequest();
	xhrSubjectConnections.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTantargyak", true);
	xhrSubjectConnections.onload = function() {
		if (xhrSubjectConnections.status === 200) {
			const tantargyak = JSON.parse(xhrSubjectConnections.responseText);
			const subjectConnectionsList = document.getElementById("subject-connections-list");

			tantargyak.forEach(function(tantargy) {
				const listItem = document.createElement("li");
				listItem.textContent = tantargy.targy_nev;

				const checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.value = tantargy.targy_id;
				checkbox.setAttribute("data-subject-connection", true);

				checkbox.addEventListener("change", function() {
					if (checkbox.checked) {
						addedSubjectConnections.push(tantargy.targy_id);
					} else {
						const index = addedSubjectConnections.indexOf(tantargy.targy_id);
						if (index > -1) addedSubjectConnections.splice(index, 1);
					}
				});

				listItem.appendChild(checkbox);
				subjectConnectionsList.appendChild(listItem);
			});
		}
	};
	xhrSubjectConnections.send();

	document.getElementById("subject-connections-modal").style.display = "block";
});

document.getElementById("close-subject-connections-modal").addEventListener("click", function() {
	document.getElementById("subject-connections-modal").style.display = "none";
});

document.getElementById("save-subject-connections").addEventListener("click", function() {
	const subjectConnectionsTextarea = document.getElementById("subject-connections");
	const selectedConnections = addedSubjectConnections.map(function(tantargyId) {
		const checkbox = document.querySelector(`input[data-subject-connection][value="${tantargyId}"]`);
		return checkbox ? checkbox.parentElement.textContent.trim() : "";
	}).filter(Boolean);

	if (subjectConnectionsTextarea.value) {
		subjectConnectionsTextarea.value += ", " + selectedConnections.join(", ");
	} else {
		subjectConnectionsTextarea.value = selectedConnections.join(", ");
	}
	document.getElementById("subject-connections-modal").style.display = "none";
});

const didaktikaiCelokCheckboxok = document.querySelectorAll('input[name="didaktikai_celok"]');
const kivalasztottCelok = [];

didaktikaiCelokCheckboxok.forEach(function(checkbox) {
	checkbox.addEventListener("change", function() {
		if (checkbox.checked) {
			kivalasztottCelok.push(checkbox.value);
		} else {
			const index = kivalasztottCelok.indexOf(checkbox.value);
			if (index > -1) {
				kivalasztottCelok.splice(index, 1);
			}
		}
		console.log("Kiválasztott célok:", kivalasztottCelok);
	});
});

document.getElementById("generate-lesson-plan").addEventListener("click", function() {
	const selectedCelok = Array.from(document.querySelectorAll('input[name="didaktikai_celok"]:checked'))
		.map(checkbox => parseInt(checkbox.value));

	const selectedTankonyvId = document.getElementById("tankonyv").value;
	const selectedTemaId = document.getElementById("tema").value;

	if (selectedCelok.length === 0 || !selectedTankonyvId || !selectedTemaId) {
		alert("Válassz ki egy tankönyvet, témát és legalább egy didaktikai célt!");
		return;
	}

	function getTaskDistribution(selectedCelok) {
		const totalTasks = 7; 
		const distribution = {};
	
		if (selectedCelok.length === 1) {
			distribution[selectedCelok[0]] = totalTasks;
		} else if (selectedCelok.length === 2) {
			distribution[selectedCelok[0]] = 4;
			distribution[selectedCelok[1]] = 3;
		} else if (selectedCelok.length === 3) {
			distribution[selectedCelok[0]] = 3;
			distribution[selectedCelok[1]] = 2;
			distribution[selectedCelok[2]] = 2;
		}
	
		return distribution;
	}

	const taskDistribution = getTaskDistribution(selectedCelok);

	let currentModszerText = null;
	let addedModszerek = [];
	let currentMunkaformaText = null;
	let addedMunkaformak = [];
	let currentEszkozText = null;
	let addedEszkozok = [];
	let addedTaskIds = []; 
	let attachmentsIndex = 1;
	const xhr = new XMLHttpRequest();
	xhr.open("GET", `https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTankonyviFeladatok&tk_id=${selectedTankonyvId}&tema_id=${selectedTemaId}&celok=${selectedCelok.join(",")}`, true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			const feladatok = JSON.parse(xhr.responseText);
			const tableBody = document.querySelector("#lesson-plan-table #main");
			tableBody.innerHTML = "";
			addedTaskIds = [];
			const mellekletekKepekDiv = document.getElementById("mellekletek-kepek");
            mellekletekKepekDiv.innerHTML = "";

			document.getElementById("close-modszerek-modal").addEventListener("click", function() {
				document.getElementById("modszerek-modal").style.display = "none";
			});

			document.getElementById("close-munkaformak-modal").addEventListener("click", function() {
				document.getElementById("munkaformak-modal").style.display = "none";
			});

			document.getElementById("close-eszkozok-modal").addEventListener("click", function() {
				document.getElementById("eszkozok-modal").style.display = "none";
			});

			document.getElementById("save-modszerek").addEventListener("click", function() {
				if (!currentModszerText) return;

				const selectedModszerek = addedModszerek.map(function(modszerId) {
					const checkbox = document.querySelector(`input[data-modszer][value="${modszerId}"]`);
					return checkbox ? checkbox.parentElement.textContent.trim() : "";
				}).filter(Boolean);

				if (currentModszerText.value) {
					currentModszerText.value += ", " + selectedModszerek.join(", ");
				} else {
					currentModszerText.value = selectedModszerek.join(", ");
				}

				document.getElementById("modszerek-modal").style.display = "none";
				currentModszerText = null;
			});

			document.getElementById("save-munkaformak").addEventListener("click", function() {
				if (!currentMunkaformaText) return;

				const selectedMunkaformak = addedMunkaformak.map(function(munkaformaId) {
					const checkbox = document.querySelector(`input[data-munkaforma][value="${munkaformaId}"]`);
					return checkbox ? checkbox.parentElement.textContent.trim() : "";
				}).filter(Boolean);

				if (currentMunkaformaText.value) {
					currentMunkaformaText.value += ", " + selectedMunkaformak.join(", ");
				} else {
					currentMunkaformaText.value = selectedMunkaformak.join(", ");
				}

				document.getElementById("munkaformak-modal").style.display = "none";
				currentMunkaformaText = null;
			});

			document.getElementById("save-eszkozok").addEventListener("click", function() {
				if (!currentEszkozText) return;

				const selectedEszkozok = addedEszkozok.map(function(eszkozId) {
					const checkbox = document.querySelector(`input[data-eszkoz][value="${eszkozId}"]`);
					return checkbox ? checkbox.parentElement.textContent.trim() : "";
				}).filter(Boolean);

				if (currentEszkozText.value) {
					currentEszkozText.value += ", " + selectedEszkozok.join(", ");
				} else {
					currentEszkozText.value = selectedEszkozok.join(", ");
				}

				document.getElementById("eszkozok-modal").style.display = "none";
				currentEszkozText = null;
			});
			
			
			for (const [celId, taskCount] of Object.entries(taskDistribution)) {
            const celFeladatok = feladatok.filter(feladat => feladat.f_didaktikai_cel_id == celId).slice(0, taskCount);
			celFeladatok.forEach(function(feladat) {
				const row = document.createElement("tr");
				row.dataset.taskId = feladat.f_id;
				const idoCell = document.createElement("td");
				const idoInput = document.createElement("input");
				const idokeretContentContainer = document.createElement("div");
				const p = document.createElement("span");
				p.textContent = "p";
				idoInput.type = "number";
				idoCell.appendChild(idokeretContentContainer);
				idokeretContentContainer.appendChild(idoInput);
				idokeretContentContainer.appendChild(p);
				row.appendChild(idoCell);

				const oraMeneteCell = document.createElement("td");
				const menetText = document.createElement("textarea");
				menetText.textContent = feladat.f_leiras;
				oraMeneteCell.appendChild(menetText);
				row.appendChild(oraMeneteCell);

				const modszerCell = document.createElement("td");
				const modszerContentContainer = document.createElement("div");
				const modszerText = document.createElement("textarea");
				const modszerButton = document.createElement("button");
				modszerButton.textContent = "+";

				modszerButton.addEventListener("click", () => {
					currentModszerText = modszerText;
					addedModszerek = [];
					document.getElementById("modszerek-list").innerHTML = '';

					const xhrModszerek = new XMLHttpRequest();
					xhrModszerek.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getModszerek", true);
					xhrModszerek.onload = function() {
						if (xhrModszerek.status === 200) {
							const modszerek = JSON.parse(xhrModszerek.responseText);
							const modszerekList = document.getElementById("modszerek-list");

							modszerek.forEach(function(modszer) {
								const listItem = document.createElement("li");
								listItem.textContent = modszer.modszer_nev;

								const checkbox = document.createElement("input");
								checkbox.type = "checkbox";
								checkbox.value = modszer.modszer_id;
								checkbox.setAttribute("data-modszer", "true");

								checkbox.addEventListener("change", function() {
									if (checkbox.checked) {
										addedModszerek.push(modszer.modszer_id);
									} else {
										const index = addedModszerek.indexOf(modszer.modszer_id);
										if (index > -1) addedModszerek.splice(index, 1);
									}
								});

								listItem.appendChild(checkbox);
								modszerekList.appendChild(listItem);
							});
						}
					};
					xhrModszerek.send();
					document.getElementById("modszerek-modal").style.display = "block";
				});

				modszerContentContainer.appendChild(modszerText);
				modszerContentContainer.appendChild(modszerButton);
				modszerCell.appendChild(modszerContentContainer);
				row.appendChild(modszerCell);

				const munkaformaCell = document.createElement("td");
				const munkaformaContentContainer = document.createElement("div");
				const munkaformaText = document.createElement("textarea");
				const munkaformaButton = document.createElement("button");
				munkaformaButton.textContent = "+";

				munkaformaButton.addEventListener("click", () => {
					currentMunkaformaText = munkaformaText; 
					addedMunkaformak = [];
					document.getElementById("munkaformak-list").innerHTML = '';

					const xhrMunkaformak = new XMLHttpRequest();
					xhrMunkaformak.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTanuloiMunkaformak", true);
					xhrMunkaformak.onload = function() {
						if (xhrMunkaformak.status === 200) {
							const munkaformak = JSON.parse(xhrMunkaformak.responseText);
							const munkaformakList = document.getElementById("munkaformak-list");

							munkaformak.forEach(function(munkaforma) {
								const listItem = document.createElement("li");
								listItem.textContent = munkaforma.munkf_nev;

								const checkbox = document.createElement("input");
								checkbox.type = "checkbox";
								checkbox.value = munkaforma.munkf_id;
								checkbox.setAttribute("data-munkaforma", "true");

								checkbox.addEventListener("change", function() {
									if (checkbox.checked) {
										addedMunkaformak.push(munkaforma.munkf_id);
									} else {
										const index = addedMunkaformak.indexOf(munkaforma.munkf_id);
										if (index > -1) addedMunkaformak.splice(index, 1);
									}
								});

								listItem.appendChild(checkbox);
								munkaformakList.appendChild(listItem);
							});
						}
					};
					xhrMunkaformak.send();
					document.getElementById("munkaformak-modal").style.display = "block";
				});

				munkaformaContentContainer.appendChild(munkaformaText);
				munkaformaContentContainer.appendChild(munkaformaButton);
				munkaformaCell.appendChild(munkaformaContentContainer);
				row.appendChild(munkaformaCell);

				const eszkozCell = document.createElement("td");
				const eszkozContentContainer = document.createElement("div");
				const eszkozText = document.createElement("textarea");
				const eszkozButton = document.createElement("button");
				eszkozButton.textContent = "+";

				eszkozButton.addEventListener("click", () => {
					currentEszkozText = eszkozText; 
					addedEszkozok = [];
					document.getElementById("eszkozok-list").innerHTML = '';

					const xhrEszkozok = new XMLHttpRequest();
					xhrEszkozok.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getEszkozok", true);
					xhrEszkozok.onload = function() {
						if (xhrEszkozok.status === 200) {
							const eszkozok = JSON.parse(xhrEszkozok.responseText);
							const eszkozokList = document.getElementById("eszkozok-list");

							eszkozok.forEach(function(eszkoz) {
								const listItem = document.createElement("li");
								listItem.textContent = eszkoz.eszkoz_nev;

								const checkbox = document.createElement("input");
								checkbox.type = "checkbox";
								checkbox.value = eszkoz.eszkoz_id;
								checkbox.setAttribute("data-eszkoz", "true");

								checkbox.addEventListener("change", function() {
									if (checkbox.checked) {
										addedEszkozok.push(eszkoz.eszkoz_id);
									} else {
										const index = addedEszkozok.indexOf(eszkoz.eszkoz_id);
										if (index > -1) addedEszkozok.splice(index, 1);
									}
								});

								listItem.appendChild(checkbox);
								eszkozokList.appendChild(listItem);
							});
						}
					};
					xhrEszkozok.send();
					document.getElementById("eszkozok-modal").style.display = "block";
				});

				eszkozContentContainer.appendChild(eszkozText);
				eszkozContentContainer.appendChild(eszkozButton);
				eszkozCell.appendChild(eszkozContentContainer);
				row.appendChild(eszkozCell);

				const megjegyzesCell = document.createElement("td");
				const megjegyzesContentContainer = document.createElement("div");
				const megjegyzesText = document.createElement("textarea");
				megjegyzesText.value = `Oldalszám: ${feladat.f_oldalszam}, Sorszám: ${feladat.f_sorszam}`;
				megjegyzesContentContainer.appendChild(megjegyzesText);
				megjegyzesCell.appendChild(megjegyzesContentContainer);
				row.appendChild(megjegyzesCell);

				const deleteCell = document.createElement("td");
				const deleteButton = document.createElement("button");
				deleteButton.className = "delete-row";
				deleteButton.innerHTML = "🗑️ Törlés";
				deleteCell.appendChild(deleteButton);
				row.appendChild(deleteCell);
				if(!addedTaskIds.includes(feladat.f_id)) {
					addedTaskIds.push(feladat.f_id);
				}	
				tableBody.appendChild(row);

				
				if (feladat.f_kep_url) {
					const kepIndex = document.createElement("h4");
					kepIndex.textContent = attachmentsIndex + ". Mellék";
					kepIndex.dataset.taskId = feladat.f_id; 
					const kep = document.createElement("img");
					kep.src = `${feladat.f_kep_url}`;
					kep.alt = "Feladat kép";
					kep.style.maxWidth = "100%";
					kep.dataset.taskId = feladat.f_id;
					mellekletekKepekDiv.appendChild(kepIndex);
					mellekletekKepekDiv.appendChild(kep);
					attachmentsIndex++;
				}
			
				if (feladat.f_megoldas_kep_url) {
					const megoldasKepIndex = document.createElement("h4");
					megoldasKepIndex.textContent = attachmentsIndex + ". Mellék (megoldás)";
					megoldasKepIndex.dataset.taskId = feladat.f_id;
					const megoldasKep = document.createElement("img");
					megoldasKep.src = `${feladat.f_megoldas_kep_url}`;
					megoldasKep.alt = "Feladat megoldás kép";
					megoldasKep.style.maxWidth = "100%";
					megoldasKep.dataset.taskId = feladat.f_id;
					mellekletekKepekDiv.appendChild(megoldasKepIndex);
					mellekletekKepekDiv.appendChild(megoldasKep);
					attachmentsIndex++;
				}
			});
		}
			
			document.getElementById("lesson-plan-table").style.display = "inline-block";
            document.getElementById("mellekletek").style.display = "block";
		} else {
			console.error("Hiba történt a feladatok lekérésekor.");
		}
	};

	document.getElementById("rahangolodas-addModszerButton").addEventListener("click", function() {
        currentModszerText = document.getElementById("rahangolodas-modszerek");
        addedModszerek = [];
        document.getElementById("modszerek-list").innerHTML = '';

        const xhrModszerek = new XMLHttpRequest();
        xhrModszerek.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getModszerek", true);
        xhrModszerek.onload = function() {
            if (xhrModszerek.status === 200) {
                const modszerek = JSON.parse(xhrModszerek.responseText);
                const modszerekList = document.getElementById("modszerek-list");

                modszerek.forEach(function(modszer) {
                    const listItem = document.createElement("li");
                    listItem.textContent = modszer.modszer_nev;

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = modszer.modszer_id;
                    checkbox.setAttribute("data-modszer", "true");

                    checkbox.addEventListener("change", function() {
                        if (checkbox.checked) {
                            addedModszerek.push(modszer.modszer_id);
                        } else {
                            const index = addedModszerek.indexOf(modszer.modszer_id);
                            if (index > -1) addedModszerek.splice(index, 1);
                        }
                    });

                    listItem.appendChild(checkbox);
                    modszerekList.appendChild(listItem);
                });
            }
        };
        xhrModszerek.send();
        document.getElementById("modszerek-modal").style.display = "block";
    });

	document.getElementById("rahangolodas-addMunkaformaButton").addEventListener("click", function() {
        currentMunkaformaText = document.getElementById("rahangolodas-munkaformak");
        addedMunkaformak = [];
        document.getElementById("munkaformak-list").innerHTML = '';

        const xhrMunkaformak = new XMLHttpRequest();
        xhrMunkaformak.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTanuloiMunkaformak", true);
        xhrMunkaformak.onload = function() {
            if (xhrMunkaformak.status === 200) {
                const munkaformak = JSON.parse(xhrMunkaformak.responseText);
                const munkaformakList = document.getElementById("munkaformak-list");

                munkaformak.forEach(function(munkaforma) {
                    const listItem = document.createElement("li");
                    listItem.textContent = munkaforma.munkf_nev;

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = munkaforma.munkf_id;
                    checkbox.setAttribute("data-munkaforma", "true");

                    checkbox.addEventListener("change", function() {
                        if (checkbox.checked) {
                            addedMunkaformak.push(munkaforma.munkf_id);
                        } else {
                            const index = addedMunkaformak.indexOf(munkaforma.munkf_id);
                            if (index > -1) addedMunkaformak.splice(index, 1);
                        }
                    });

                    listItem.appendChild(checkbox);
                    munkaformakList.appendChild(listItem);
                });
            }
        };
        xhrMunkaformak.send();
        document.getElementById("munkaformak-modal").style.display = "block";
    });

    document.getElementById("rahangolodas-addEszkozButton").addEventListener("click", function() {
        currentEszkozText = document.getElementById("rahangolodas-eszkozok");
        addedEszkozok = [];
        document.getElementById("eszkozok-list").innerHTML = '';

        const xhrEszkozok = new XMLHttpRequest();
        xhrEszkozok.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getEszkozok", true);
        xhrEszkozok.onload = function() {
            if (xhrEszkozok.status === 200) {
                const eszkozok = JSON.parse(xhrEszkozok.responseText);
                const eszkozokList = document.getElementById("eszkozok-list");

                eszkozok.forEach(function(eszkoz) {
                    const listItem = document.createElement("li");
                    listItem.textContent = eszkoz.eszkoz_nev;

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = eszkoz.eszkoz_id;
                    checkbox.setAttribute("data-eszkoz", "true");

                    checkbox.addEventListener("change", function() {
                        if (checkbox.checked) {
                            addedEszkozok.push(eszkoz.eszkoz_id);
                        } else {
                            const index = addedEszkozok.indexOf(eszkoz.eszkoz_id);
                            if (index > -1) addedEszkozok.splice(index, 1);
                        }
                    });

                    listItem.appendChild(checkbox);
                    eszkozokList.appendChild(listItem);
                });
            }
        };
        xhrEszkozok.send();
        document.getElementById("eszkozok-modal").style.display = "block";
    });

	document.getElementById("befejezo-addModszerButton").addEventListener("click", function() {
        currentModszerText = document.getElementById("befejezo-modszerek");
        addedModszerek = [];
        document.getElementById("modszerek-list").innerHTML = '';

        const xhrModszerek = new XMLHttpRequest();
        xhrModszerek.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getModszerek", true);
        xhrModszerek.onload = function() {
            if (xhrModszerek.status === 200) {
                const modszerek = JSON.parse(xhrModszerek.responseText);
                const modszerekList = document.getElementById("modszerek-list");

                modszerek.forEach(function(modszer) {
                    const listItem = document.createElement("li");
                    listItem.textContent = modszer.modszer_nev;

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = modszer.modszer_id;
                    checkbox.setAttribute("data-modszer", "true");

                    checkbox.addEventListener("change", function() {
                        if (checkbox.checked) {
                            addedModszerek.push(modszer.modszer_id);
                        } else {
                            const index = addedModszerek.indexOf(modszer.modszer_id);
                            if (index > -1) addedModszerek.splice(index, 1);
                        }
                    });

                    listItem.appendChild(checkbox);
                    modszerekList.appendChild(listItem);
                });
            }
        };
        xhrModszerek.send();
        document.getElementById("modszerek-modal").style.display = "block";
    });

    document.getElementById("befejezo-addMunkaformaButton").addEventListener("click", function() {
        currentMunkaformaText = document.getElementById("befejezo-munkaformak");
        addedMunkaformak = [];
        document.getElementById("munkaformak-list").innerHTML = '';

        const xhrMunkaformak = new XMLHttpRequest();
        xhrMunkaformak.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTanuloiMunkaformak", true);
        xhrMunkaformak.onload = function() {
            if (xhrMunkaformak.status === 200) {
                const munkaformak = JSON.parse(xhrMunkaformak.responseText);
                const munkaformakList = document.getElementById("munkaformak-list");

                munkaformak.forEach(function(munkaforma) {
                    const listItem = document.createElement("li");
                    listItem.textContent = munkaforma.munkf_nev;

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = munkaforma.munkf_id;
                    checkbox.setAttribute("data-munkaforma", "true");

                    checkbox.addEventListener("change", function() {
                        if (checkbox.checked) {
                            addedMunkaformak.push(munkaforma.munkf_id);
                        } else {
                            const index = addedMunkaformak.indexOf(munkaforma.munkf_id);
                            if (index > -1) addedMunkaformak.splice(index, 1);
                        }
                    });

                    listItem.appendChild(checkbox);
                    munkaformakList.appendChild(listItem);
                });
            }
        };
        xhrMunkaformak.send();
        document.getElementById("munkaformak-modal").style.display = "block";
    });

    document.getElementById("befejezo-addEszkozButton").addEventListener("click", function() {
        currentEszkozText = document.getElementById("befejezo-eszkozok");
        addedEszkozok = [];
        document.getElementById("eszkozok-list").innerHTML = '';

        const xhrEszkozok = new XMLHttpRequest();
        xhrEszkozok.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getEszkozok", true);
        xhrEszkozok.onload = function() {
            if (xhrEszkozok.status === 200) {
                const eszkozok = JSON.parse(xhrEszkozok.responseText);
                const eszkozokList = document.getElementById("eszkozok-list");

                eszkozok.forEach(function(eszkoz) {
                    const listItem = document.createElement("li");
                    listItem.textContent = eszkoz.eszkoz_nev;

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = eszkoz.eszkoz_id;
                    checkbox.setAttribute("data-eszkoz", "true");

                    checkbox.addEventListener("change", function() {
                        if (checkbox.checked) {
                            addedEszkozok.push(eszkoz.eszkoz_id);
                        } else {
                            const index = addedEszkozok.indexOf(eszkoz.eszkoz_id);
                            if (index > -1) addedEszkozok.splice(index, 1);
                        }
                    });

                    listItem.appendChild(checkbox);
                    eszkozokList.appendChild(listItem);
                });
            }
        };
        xhrEszkozok.send();
        document.getElementById("eszkozok-modal").style.display = "block"; 
	});
	xhr.send();
	document.getElementById("add-task-button").addEventListener("click", function() {
		const selectedTankonyvId = document.getElementById("tankonyv").value;
		const selectedTemaId = document.getElementById("tema").value;
		
		if (!selectedTankonyvId || !selectedTemaId) {
			alert("Válassz tankönyvet és témát először!");
			return;
		}
		
		const xhr = new XMLHttpRequest();
		xhr.open("GET", `https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getAvailableTasks&tk_id=${selectedTankonyvId}&tema_id=${selectedTemaId}&excluded_ids=${addedTaskIds.join(",")}`, true);
		xhr.onload = function() {
			if (xhr.status === 200) {
				const tasks = JSON.parse(xhr.responseText);
				const taskSelect = document.getElementById("add-task-select");
				taskSelect.innerHTML = '';
				
				tasks.forEach(function(task) {
					const option = document.createElement("option");
					option.value = JSON.stringify(task);
					option.textContent = `Oldalszám: ${task.f_oldalszam}, Sorszám: ${task.f_sorszam}`;
					taskSelect.appendChild(option);
				});
				
				document.getElementById("add-task-modal").style.display = "block";
			}
		};
		xhr.send();
	});
	
	document.getElementById("save-task").addEventListener("click", function() {
        const selectedOptions = document.querySelectorAll('#add-task-select option:checked');
        selectedOptions.forEach(function(option) {
            const task = JSON.parse(option.value);
            if (!addedTaskIds.includes(task.f_id)) { 
				addedTaskIds.push(task.f_id);
				addTaskToTable(task);
			}
        });
        document.getElementById("add-task-modal").style.display = "none";
    });
	
	document.getElementById("close-task-modal").addEventListener("click", function() {
		document.getElementById("add-task-modal").style.display = "none";
	});

document.querySelector('#lesson-plan-table').addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (!button) return;

    const row = button.closest('tr');
    const textarea = row.querySelector('textarea');

    if (button.classList.contains('add-modszer')) {
        currentModszerText = row.querySelector('td:nth-child(3) textarea');
        showModszerekModal();
    }
    
    if (button.classList.contains('add-munkaforma')) {
        currentMunkaformaText = row.querySelector('td:nth-child(4) textarea');
        showMunkaformakModal();
    }
    
    if (button.classList.contains('add-eszkoz')) {
        currentEszkozText = row.querySelector('td:nth-child(5) textarea');
        showEszkozokModal();
    }
});

function showModszerekModal() {
    addedModszerek = [];
    document.getElementById("modszerek-list").innerHTML = '';
    
    const xhrModszerek = new XMLHttpRequest();
    xhrModszerek.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getModszerek", true);
    xhrModszerek.onload = function() {
        if (xhrModszerek.status === 200) {
            const modszerek = JSON.parse(xhrModszerek.responseText);
            const modszerekList = document.getElementById("modszerek-list");

            modszerek.forEach(function(modszer) {
                const listItem = document.createElement("li");
                listItem.textContent = modszer.modszer_nev;

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = modszer.modszer_id;
                checkbox.setAttribute("data-modszer", "true");

                checkbox.addEventListener("change", function() {
                    if (checkbox.checked) {
                        addedModszerek.push(modszer.modszer_id);
                    } else {
                        const index = addedModszerek.indexOf(modszer.modszer_id);
                        if (index > -1) addedModszerek.splice(index, 1);
                    }
                });

                listItem.appendChild(checkbox);
                modszerekList.appendChild(listItem);
            });
        }
    };
    xhrModszerek.send();
    document.getElementById("modszerek-modal").style.display = "block";
}

function showMunkaformakModal() {
    addedMunkaformak = [];
    document.getElementById("munkaformak-list").innerHTML = '';
    
    const xhrMunkaformak = new XMLHttpRequest();
    xhrMunkaformak.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getTanuloiMunkaformak", true);
    xhrMunkaformak.onload = function() {
        if (xhrMunkaformak.status === 200) {
            const munkaformak = JSON.parse(xhrMunkaformak.responseText);
            const munkaformakList = document.getElementById("munkaformak-list");

            munkaformak.forEach(function(munkaforma) {
                const listItem = document.createElement("li");
                listItem.textContent = munkaforma.munkf_nev;

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = munkaforma.munkf_id;
                checkbox.setAttribute("data-munkaforma", "true");

                checkbox.addEventListener("change", function() {
                    if (checkbox.checked) {
                        addedMunkaformak.push(munkaforma.munkf_id);
                    } else {
                        const index = addedMunkaformak.indexOf(munkaforma.munkf_id);
                        if (index > -1) addedMunkaformak.splice(index, 1);
                    }
                });

                listItem.appendChild(checkbox);
                munkaformakList.appendChild(listItem);
            });
        }
    };
    xhrMunkaformak.send();
    document.getElementById("munkaformak-modal").style.display = "block";
}

function showEszkozokModal() {
    addedEszkozok = [];
    document.getElementById("eszkozok-list").innerHTML = '';
    
    const xhrEszkozok = new XMLHttpRequest();
    xhrEszkozok.open("GET", "https://pti.unithe.hu:8443/~w6y0xz/szakdog_2/routes/routes.php?action=getEszkozok", true);
    xhrEszkozok.onload = function() {
        if (xhrEszkozok.status === 200) {
            const eszkozok = JSON.parse(xhrEszkozok.responseText);
            const eszkozokList = document.getElementById("eszkozok-list");

            eszkozok.forEach(function(eszkoz) {
                const listItem = document.createElement("li");
                listItem.textContent = eszkoz.eszkoz_nev;

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = eszkoz.eszkoz_id;
                checkbox.setAttribute("data-eszkoz", "true");

                checkbox.addEventListener("change", function() {
                    if (checkbox.checked) {
                        addedEszkozok.push(eszkoz.eszkoz_id);
                    } else {
                        const index = addedEszkozok.indexOf(eszkoz.eszkoz_id);
                        if (index > -1) addedEszkozok.splice(index, 1);
                    }
                });

                listItem.appendChild(checkbox);
                eszkozokList.appendChild(listItem);
            });
        }
    };
    xhrEszkozok.send();
    document.getElementById("eszkozok-modal").style.display = "block";
}

function createTaskRow(feladat) {
    return `
    <tr>
        <td><div><input type="number"><span>p</span></div></td>
        <td><textarea>${feladat.f_leiras}</textarea></td>
        <td>
            <div>
                <textarea></textarea>
                <button class="add-modszer">+</button>
            </div>
        </td>
        <td>
            <div>
                <textarea></textarea>
                <button class="add-munkaforma">+</button>
            </div>
        </td>
        <td>
            <div>
                <textarea></textarea>
                <button class="add-eszkoz">+</button>
            </div>
        </td>
        <td><textarea>Oldalszám: ${feladat.f_oldalszam}, Sorszám: ${feladat.f_sorszam}</textarea></td>
		 <td><button class="delete-row">🗑️ Törlés</button></td>
    </tr>
    `;
}

function addTaskToTable(feladat) {
    const tableBody = document.querySelector("#lesson-plan-table #main");
    
    const row = document.createElement("tr");
    row.dataset.taskId = feladat.f_id;
    
    const idoCell = document.createElement("td");
    idoCell.innerHTML = `<div><input type="number"><span>p</span></div>`;
    
    const leirasCell = document.createElement("td");
    const leirasTextarea = document.createElement("textarea");
    leirasTextarea.textContent = feladat.f_leiras;
    leirasCell.appendChild(leirasTextarea);
    
    const modszerCell = document.createElement("td");
    modszerCell.innerHTML = `
        <div>
            <textarea></textarea>
            <button class="add-modszer">+</button>
        </div>
    `;
    
    const munkaformaCell = document.createElement("td");
    munkaformaCell.innerHTML = `
        <div>
            <textarea></textarea>
            <button class="add-munkaforma">+</button>
        </div>
    `;
    
    const eszkozCell = document.createElement("td");
    eszkozCell.innerHTML = `
        <div>
            <textarea></textarea>
            <button class="add-eszkoz">+</button>
        </div>
    `;
    
    const megjegyzesCell = document.createElement("td");
    const megjegyzesTextarea = document.createElement("textarea");
    megjegyzesTextarea.value = `Oldalszám: ${feladat.f_oldalszam}, Sorszám: ${feladat.f_sorszam}`;
    megjegyzesCell.appendChild(megjegyzesTextarea);
    
    const deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button class="delete-row">🗑️ Törlés</button>`;
    
    row.appendChild(idoCell);
    row.appendChild(leirasCell);
    row.appendChild(modszerCell);
    row.appendChild(munkaformaCell);
    row.appendChild(eszkozCell);
    row.appendChild(megjegyzesCell);
    row.appendChild(deleteCell);
    
    tableBody.appendChild(row);

    const mellekletekKepekDiv = document.getElementById("mellekletek-kepek");
    if (feladat.f_kep_url) {
        const kepIndex = document.createElement("h4");
        kepIndex.textContent = `${attachmentsIndex}. Mellék`;
        kepIndex.dataset.taskId = feladat.f_id; 
        const kep = document.createElement("img");
        kep.src = feladat.f_kep_url;
        kep.alt = "Feladat kép";
        kep.style.maxWidth = "100%";
        kep.dataset.taskId = feladat.f_id; 
        mellekletekKepekDiv.appendChild(kepIndex);
        mellekletekKepekDiv.appendChild(kep);
        attachmentsIndex++;
    }
    if (feladat.f_megoldas_kep_url) {
        const megoldasKepIndex = document.createElement("h4");
        megoldasKepIndex.textContent = `${attachmentsIndex}. Mellék (megoldás)`;
        megoldasKepIndex.dataset.taskId = feladat.f_id; 
        const megoldasKep = document.createElement("img");
        megoldasKep.src = feladat.f_megoldas_kep_url;
        megoldasKep.alt = "Megoldás kép";
        megoldasKep.style.maxWidth = "100%";
        megoldasKep.dataset.taskId = feladat.f_id; 
        mellekletekKepekDiv.appendChild(megoldasKepIndex);
        mellekletekKepekDiv.appendChild(megoldasKep);
        attachmentsIndex++;
    }
}
	document.getElementById("add-custom-task").addEventListener("click", function() {
		addEmptyTaskToTable();
	});

	function createEmptyTaskRow() {
		return `
		<tr>
			<td><div><input type="number" placeholder="Idő"><span>p</span></div></td>
			<td><textarea placeholder="Feladat leírása"></textarea></td>
			<td>
				<div>
					<textarea placeholder="Módszerek"></textarea>
					<button class="add-modszer">+</button>
				</div>
			</td>
			<td>
				<div>
					<textarea placeholder="Munkaformák"></textarea>
					<button class="add-munkaforma">+</button>
				</div>
			</td>
			<td>
				<div>
					<textarea placeholder="Eszközök"></textarea>
					<button class="add-eszkoz">+</button>
				</div>
			</td>
			<td><textarea placeholder="Megjegyzések"></textarea></td>
			 <td><button class="delete-row">🗑️ Törlés</button></td>
		</tr>
		`;
	}

	function addEmptyTaskToTable() {
		const tableBody = document.querySelector("#lesson-plan-table #main");
		tableBody.insertAdjacentHTML('beforeend', createEmptyTaskRow());
	}

	document.querySelector('#lesson-plan-table').addEventListener('click', function(e) {
		if (e.target.classList.contains('delete-row')) {
			const row = e.target.closest('tr');
			const taskId = row.dataset.taskId;
			
			const attachments = document.querySelectorAll(`[data-task-id="${taskId}"]`);
			attachments.forEach(attachment => attachment.remove());
			
			row.remove();
			
			const index = addedTaskIds.indexOf(parseInt(taskId));
			if (index > -1) {
				addedTaskIds.splice(index, 1);
			}
			updateAttachmentIndexes();
		}
	});
	
	function updateAttachmentIndexes() {
		const mellekletek = document.querySelectorAll('#mellekletek-kepek h4');
		let index = 1;
		
		mellekletek.forEach((h4) => {
			if(h4.isConnected) {
				const originalText = h4.textContent.split('. ')[1];
				h4.textContent = `${index}. ${originalText}`;
				
				const nextSibling = h4.nextElementSibling;
				if(nextSibling && nextSibling.tagName === 'IMG') {
					const newIndex = document.createElement("h4");
					newIndex.textContent = `${index}. ${originalText}`;
					h4.parentNode.insertBefore(newIndex, nextSibling);
					h4.remove();
				}
				index++;
			}
		});
		
		attachmentsIndex = index;
	}
});